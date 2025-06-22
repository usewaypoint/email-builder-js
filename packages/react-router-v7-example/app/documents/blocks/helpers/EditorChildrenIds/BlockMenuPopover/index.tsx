import { useState } from 'react';

import { type TEditorBlock } from '../../../../editor/core';

import { Plus } from 'lucide-react';
import BlocksMenu from './BlocksMenu';
import DividerButton from './DividerButton';

type Props = {
  placeholder?: boolean;
  onSelect: (block: TEditorBlock) => void;
};
export function BlockMenuPopoverTrigger({ onSelect, placeholder }: Props) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [buttonElement, setButtonElement] = useState<HTMLElement | null>(null);

  const handleButtonClick = () => {
    setMenuAnchorEl(buttonElement);
  };

  const renderButton = () => {
    if (placeholder) {
      return (
        <div
          className="flex items-center justify-center p-3 border-2 border-dashed hover:text-primary hover:border-cyan-500 transition-colors cursor-pointer group"
          onClick={handleButtonClick}
        >
          <Plus className="size-5 bg-cyan-600 text-white rounded-full text-sm p-0.5 group-hover:bg-cyan-700 transition-colors" />
        </div>
      );
    } else {
      return <DividerButton buttonElement={buttonElement} onClick={handleButtonClick} />;
    }
  };

  return (
    <>
      <div ref={setButtonElement} style={{ position: 'relative' }}>
        {renderButton()}
      </div>
      <BlocksMenu anchorEl={menuAnchorEl} setAnchorEl={setMenuAnchorEl} onSelect={onSelect} />
    </>
  );
}
