import React, { CSSProperties } from 'react';

import { DeleteOutlined } from '@mui/icons-material';
import { IconButton, Paper, Stack, Tooltip } from '@mui/material';

import { TEditorBlock } from '../../../editor/core';
import { setEditorState, useDocument } from '../../../editor/EditorContext';
import { ColumnsContainerProps } from '../../ColumnsContainer/ColumnsContainerPropsSchema';

const STYLE: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: -52,
  borderRadius: 64,
};

type Props = {
  blockId: string;
};
export default function TuneMenu({ blockId }: Props) {
  const document = useDocument();

  const handleDeleteClick = () => {
    const nDocument: typeof document = { ...document };
    for (const [id, b] of Object.entries(nDocument)) {
      const block = b as TEditorBlock;
      if (id === blockId) {
        continue;
      }
      switch (block.type) {
        case 'EmailLayout':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              childrenIds: block.data.childrenIds.filter((f) => f !== blockId),
            },
          };
          break;
        case 'Container':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              props: {
                ...block.data.props,
                childrenIds: block.data.props.childrenIds.filter((f) => f !== blockId),
              },
            },
          };
          break;
        case 'ColumnsContainer':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              props: {
                ...block.data.props,
                columns: block.data.props.columns.map((c) => ({
                  childrenIds: c.childrenIds.filter((f) => f !== blockId),
                })) as ColumnsContainerProps['props']['columns'],
              },
            },
          };
          break;
        default:
          nDocument[id] = block;
      }
    }
    delete nDocument[blockId];
    setEditorState({
      document: nDocument,
      selectedBlockId: null,
    });
  };

  return (
    <Paper style={STYLE} onClick={(ev) => ev.stopPropagation()}>
      <Stack>
        <Tooltip title="Delete" placement="left-start">
          <IconButton onClick={handleDeleteClick} sx={{ color: 'text.primary' }}>
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}
