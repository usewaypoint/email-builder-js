import { setSelectedBlockId, useSelectedBlockId } from '~/context/editor';
import { useCurrentBlockId } from '../../../editor/EditorBlock';
import BubbleMenu from './BubbleMenu';

export default function EditorBlockWrapper({ children }: { children: React.ReactNode }) {
  const selectedBlockId = useSelectedBlockId();
  const blockId = useCurrentBlockId();

  const isSelected = selectedBlockId === blockId;

  const renderBubbleMenu = () => {
    if (selectedBlockId !== blockId) {
      return null;
    }
    // Only render the selected block's bubble menu
    return <BubbleMenu blockId={blockId} />;
  };

  return (
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
      {renderBubbleMenu()}
      {children}
    </div>
  );
}
