import React from 'react';

import { TEditorBlock } from '../../editor/core';
import { useCurrentBlockId } from '../../editor/EditorBlock';
import { useEditorState } from '../../editor/EditorContext';
import ReaderBlock from '../../reader/ReaderBlock';
import EditorChildrenIds from '../helpers/EditorChildrenIds';

import ColumnsContainerPropsSchema, { ColumnsContainerProps } from './ColumnsContainerPropsSchema';

export function ColumnsContainer({ props: { columnsCount, columns } }: ColumnsContainerProps) {
  let lastColumn = null;
  if (columnsCount === 3) {
    lastColumn = (
      <td>
        {columns[2].childrenIds.map((childId) => (
          <ReaderBlock key={childId} id={childId} />
        ))}
      </td>
    );
  }
  return (
    <table
      align="center"
      width="100%"
      cellPadding="0"
      border={0}
      style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}
    >
      <tbody style={{ width: '100%' }}>
        <tr style={{ width: '100%' }}>
          <td>
            {columns[0].childrenIds.map((childId) => (
              <ReaderBlock key={childId} id={childId} />
            ))}
          </td>
          <td>
            {columns[1].childrenIds.map((childId) => (
              <ReaderBlock key={childId} id={childId} />
            ))}
          </td>
          {lastColumn}
        </tr>
      </tbody>
    </table>
  );
}

export function EditorColumnsContainer(data: ColumnsContainerProps) {
  const { columnsCount, columns } = data.props;
  const [{ document }, setEditorState] = useEditorState();
  const blockId = useCurrentBlockId();

  const insertBlock = (columnIndex: 0 | 1 | 2, blockConfiguration: TEditorBlock, i: number | null) => {
    const id = `block-${Date.now()}`;

    const getColumns = () => {
      const columnsCopy: ColumnsContainerProps['props']['columns'] = [...columns];
      if (i === null) {
        columnsCopy[columnIndex] = {
          childrenIds: [...columns[columnIndex].childrenIds, id],
        };
        return columnsCopy;
      }
      columnsCopy[columnIndex] = {
        childrenIds: [
          ...columns[columnIndex].childrenIds.slice(0, i),
          id,
          ...columns[columnIndex].childrenIds.slice(i),
        ],
      };
      return columnsCopy;
    };
    const data = ColumnsContainerPropsSchema.parse(document[blockId].data);
    setEditorState({
      selectedBlockId: id,
      document: {
        ...document,
        [id]: blockConfiguration,
        [blockId]: {
          type: 'ColumnsContainer',
          data: {
            ...data,
            props: {
              ...data.props,
              columns: getColumns(),
            },
          },
        },
      },
    });
  };

  let lastColumn = null;
  if (columnsCount === 3) {
    lastColumn = (
      <td>
        <EditorChildrenIds
          childrenIds={columns[2].childrenIds}
          insertBlock={(block, index) => {
            insertBlock(2, block, index);
          }}
        />
      </td>
    );
  }
  return (
    <table
      align="center"
      width="100%"
      cellPadding="0"
      border={0}
      style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}
    >
      <tbody style={{ width: '100%' }}>
        <tr style={{ width: '100%' }}>
          <td>
            <EditorChildrenIds
              childrenIds={columns[0].childrenIds}
              insertBlock={(block, index) => {
                insertBlock(0, block, index);
              }}
            />
          </td>
          <td>
            <EditorChildrenIds
              childrenIds={columns[1].childrenIds}
              insertBlock={(block, index) => {
                insertBlock(1, block, index);
              }}
            />
          </td>
          {lastColumn}
        </tr>
      </tbody>
    </table>
  );
}
