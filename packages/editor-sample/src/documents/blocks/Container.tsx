import React from 'react';
import { z } from 'zod';

import { TEditorBlock } from '../editor/core';
import { useEditorState } from '../editor/EditorContext';
import ReaderBlock from '../reader/ReaderBlock';

import EditorChildrenIds from './helpers/EditorChildrenIds';
import { zColor, zPadding } from './helpers/zod';

export const ContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: zColor().nullable().default(null),
      borderColor: zColor().nullable().default(null),
      borderRadius: z.number().default(0),
      padding: zPadding().optional().default({
        top: 16,
        bottom: 16,
        left: 24,
        right: 24,
      }),
    })
    .default({}),
  props: z.object({
    childrenIds: z.array(z.string()),
  }),
});

export type ContainerProps = z.infer<typeof ContainerPropsSchema>;

export function Container({ props: { childrenIds } }: ContainerProps) {
  return (
    <>
      {childrenIds.map((childId) => (
        <ReaderBlock key={childId} id={childId} />
      ))}
    </>
  );
}

export function EditorContainer({ props: { childrenIds } }: ContainerProps) {
  const [{ document, selectedBlockId }, setEditorState] = useEditorState();

  const insertBlock = (blockConfiguration: TEditorBlock, i: number | null) => {
    if (!selectedBlockId) {
      return;
    }
    const id = `block-${Date.now()}`;
    let nChildrenIds: string[];
    if (i === null) {
      nChildrenIds = [...childrenIds, id];
    } else {
      nChildrenIds = [...childrenIds.slice(0, i), id, ...childrenIds.slice(i)];
    }
    const containerBlock = document[selectedBlockId];
    setEditorState({
      selectedBlockId: id,
      document: {
        ...document,
        [id]: blockConfiguration,
        [selectedBlockId]: {
          type: 'Container',
          data: {
            ...containerBlock.data,
            props: { childrenIds: nChildrenIds },
          },
        } as TEditorBlock,
      },
    });
    setEditorState({});
  };

  return <EditorChildrenIds childrenIds={childrenIds} insertBlock={insertBlock} />;
}
