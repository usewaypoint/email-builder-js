import React from 'react';

import { ColumnsContainer as BaseColumnsContainer } from '@usewaypoint/block-columns-container';

import { TEditorBlock } from '../../editor/core';
import { useCurrentBlockId } from '../../editor/EditorBlock';
import { useEditorState } from '../../editor/EditorContext';
import ReaderBlock from '../../reader/ReaderBlock';
import EditorChildrenIds from '../helpers/EditorChildrenIds';

import ColumnsContainerPropsSchema, { ColumnsContainerProps } from './ColumnsContainerPropsSchema';

export function ColumnsContainer({ style, props }: ColumnsContainerProps) {
  const { columns, ...restProps } = props ?? {};
  let cols = undefined;
  if (columns) {
    cols = columns.map((col) => col.childrenIds.map((childId) => <ReaderBlock key={childId} id={childId} />));
  }

  return <BaseColumnsContainer props={restProps} columns={cols} style={style} />;
}

const EMPTY_COLUMNS = [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }];

export function EditorColumnsContainer({ style, props }: ColumnsContainerProps) {
  const [{ document }, setEditorState] = useEditorState();
  const blockId = useCurrentBlockId();

  const { columns, ...restProps } = props ?? {};
  const columnsValue = columns ?? EMPTY_COLUMNS;

  const renderColumn = (columnIndex: 0 | 1 | 2) => (
    <EditorChildrenIds
      childrenIds={columns?.[columnIndex]?.childrenIds || []}
      insertBlock={(block, index) => {
        insertBlock(columnIndex, block, index);
      }}
    />
  );

  const insertBlock = (columnIndex: 0 | 1 | 2, blockConfiguration: TEditorBlock, i: number | null) => {
    const id = `block-${Date.now()}`;

    const getColumns = () => {
      const columnsCopy = [...columnsValue];
      if (i === null) {
        columnsCopy[columnIndex] = {
          childrenIds: [...columnsValue[columnIndex].childrenIds, id],
        };
        return columnsCopy;
      }
      columnsCopy[columnIndex] = {
        childrenIds: [
          ...columnsValue[columnIndex].childrenIds.slice(0, i),
          id,
          ...columnsValue[columnIndex].childrenIds.slice(i),
        ],
      };
      return columnsCopy;
    };

    setEditorState({
      selectedBlockId: id,
      document: {
        ...document,
        [id]: blockConfiguration,
        [blockId]: {
          type: 'ColumnsContainer',
          data: ColumnsContainerPropsSchema.parse({
            style,
            props: {
              ...restProps,
              columns: getColumns(),
            },
          }),
        },
      },
    });
  };

  return (
    <BaseColumnsContainer
      props={restProps}
      style={style}
      columns={[renderColumn(0), renderColumn(1), renderColumn(2)]}
    />
  );
}
