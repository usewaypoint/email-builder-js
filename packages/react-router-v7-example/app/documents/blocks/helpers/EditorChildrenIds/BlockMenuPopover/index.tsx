import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { type TEditorBlock } from '../../../../editor/core';
import { BlocksMenu } from './BlocksMenu';
import { DividerButton } from './DividerButton';

type Props = {
  placeholder?: boolean;
  onSelect: (block: TEditorBlock) => void;
};
export function BlockMenuPopoverTrigger({ onSelect, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild onClick={() => setOpen(true)}>
          {placeholder ? (
            <button className="w-full flex items-center justify-center p-3 border-2 border-dashed hover:text-primary hover:border-cyan-500 transition-colors cursor-pointer group">
              <Plus className="size-5 bg-cyan-600 text-white rounded-full text-sm p-0.5 group-hover:bg-cyan-700 transition-colors" />
            </button>
          ) : (
            <DividerButton containerRef={containerRef} />
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1">
          <BlocksMenu
            onSelect={(b) => {
              onSelect(b);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
