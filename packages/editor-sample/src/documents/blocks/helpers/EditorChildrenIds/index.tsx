import React, { Fragment } from 'react';

import { TEditorBlock } from '../../../editor/core';
import EditorBlock from '../../../editor/EditorBlock';

import AddBlockButton from './AddBlockMenu';

type Props = {
  childrenIds: string[];
  insertBlock: (block: TEditorBlock, index: number | null) => void;
};
export default function EditorChildrenIds({ childrenIds, insertBlock }: Props) {
  return (
    <>
      {childrenIds.map((childId, i) => (
        <Fragment key={childId}>
          <AddBlockButton onSelect={(block) => insertBlock(block, i)} />
          <EditorBlock id={childId} />
        </Fragment>
      ))}
      <AddBlockButton placeholder={childrenIds.length === 0} onSelect={(block) => insertBlock(block, null)} />
    </>
  );
}
