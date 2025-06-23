import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { setSelectedBlockId, useSelectedBlockId } from '~/context/editor';
import { useCurrentBlockId } from '../../../editor/EditorBlock';
import BubbleMenu from './BubbleMenu';
import { useIsMobile } from '~/hooks/use-mobile';

export default function EditorBlockWrapper({ children }: { children: React.ReactNode }) {
  const selectedBlockId = useSelectedBlockId();
  const blockId = useCurrentBlockId();
  const isMobile = useIsMobile();

  const isSelected = selectedBlockId === blockId;

  return (
    <Popover open={isSelected}>
      <PopoverTrigger asChild>
        <div
          className={`relative max-w-full -outline-offset-2 transition-all ${
            isSelected ? 'outline-2 outline-cyan-600' : 'hover:outline-2 hover:outline-cyan-400'
          }`}
          onClick={(ev) => {
            setSelectedBlockId(blockId);
            ev.stopPropagation();
            ev.preventDefault();
          }}
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent
        side={isMobile ? 'top' : 'left'}
        className="w-auto rounded-full p-1"
        onFocusCapture={(e) => {
          e.stopPropagation();
        }}
      >
        {
          // Only render the selected block's bubble menu
          selectedBlockId === blockId && <BubbleMenu blockId={blockId} />
        }
      </PopoverContent>
    </Popover>
  );
}
