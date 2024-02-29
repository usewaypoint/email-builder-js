import React from 'react';

import { Container as BaseContainer } from '@usewaypoint/block-container';

import { TEditorBlock } from '../../editor/core';
import { useCurrentBlockId } from '../../editor/EditorBlock';
import { setEditorState, useDocument } from '../../editor/EditorContext';
import ReaderBlock from '../../reader/ReaderBlock';
import EditorChildrenIds from '../helpers/EditorChildrenIds';

import { ContainerProps } from './ContainerPropsSchema';

export function Container({ style, props }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];
  return (
    <BaseContainer style={style}>
      {childrenIds.map((childId) => (
        <ReaderBlock key={childId} id={childId} />
      ))}
    </BaseContainer>
  );
}

export function EditorContainer({ style, props }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];

  const document = useDocument();
  const blockId = useCurrentBlockId();

  const insertBlock = (blockConfiguration: TEditorBlock, i: number | null) => {
    const id = `block-${Date.now()}`;
    let nChildrenIds: string[];
    if (i === null) {
      nChildrenIds = [...childrenIds, id];
    } else {
      nChildrenIds = [...childrenIds.slice(0, i), id, ...childrenIds.slice(i)];
    }

    setEditorState({
      selectedBlockId: id,
      document: {
        ...document,
        [id]: blockConfiguration,
        [blockId]: {
          type: 'Container',
          data: {
            ...document[blockId].data,
            props: { childrenIds: nChildrenIds },
          },
        },
      },
    });
  };

  return (
    <BaseContainer style={style}>
      <EditorChildrenIds childrenIds={childrenIds} insertBlock={insertBlock} />
    </BaseContainer>
  );
}
