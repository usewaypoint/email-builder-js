import { type TEditorBlock } from '../../../../editor/core';
import { BlockButton } from './BlockButton';
import { BUTTONS } from './buttons';

type BlocksMenuProps = {
  onSelect: (block: TEditorBlock) => void;
};
export function BlocksMenu({ onSelect }: BlocksMenuProps) {
  const onClick = (block: TEditorBlock) => {
    onSelect(block);
  };

  return (
    <div className="grid grid-cols-4 gap-0.5 p-2">
      {BUTTONS.map((k, i) => (
        <BlockButton key={i} label={k.label} icon={k.icon} onClick={() => onClick(k.block())} />
      ))}
    </div>
  );
}
