import React, { CSSProperties, useState } from 'react';

import { Box } from '@mui/material';

import { useCurrentBlockId } from '../../../editor/EditorBlock';
import { useEditorState } from '../../../editor/EditorContext';

import ReaderBlockWrapper from './ReaderBlockWrapper';
import TuneMenu from './TuneMenu';

type TEditorBlockWrapperProps = {
  style: {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    backgroundColor?: any;
    borderColor?: any;
    borderRadius?: any;
    color?: any;
    fontFamily?: any;
    fontSize?: any;
    fontWeight?: any;
    padding?: any;
    textAlign?: any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  };
  children: JSX.Element;
};

export default function EditorBlockWrapper({ style, children }: TEditorBlockWrapperProps) {
  const [{ selectedBlockId }, setEditorState] = useEditorState();
  const [mouseInside, setMouseInside] = useState(false);
  const blockId = useCurrentBlockId();

  let outline: CSSProperties['outline'];
  if (selectedBlockId === blockId) {
    outline = '2px solid blue';
  } else if (mouseInside) {
    outline = '2px dashed blue';
  }

  const renderMenu = () => {
    if (selectedBlockId !== blockId) {
      return null;
    }
    return <TuneMenu blockId={blockId} />;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '100%',
        outlineOffset: '-1px',
        outline,
      }}
      onMouseEnter={(ev) => {
        setMouseInside(true);
        ev.stopPropagation();
      }}
      onMouseLeave={(ev) => {
        setMouseInside(false);
        ev.stopPropagation();
      }}
      onClick={(ev) => {
        setEditorState({
          selectedSidebarTab: 'block-configuration',
          selectedBlockId: blockId,
        });
        ev.stopPropagation();
        ev.preventDefault();
      }}
    >
      {renderMenu()}
      <ReaderBlockWrapper style={style}>{children}</ReaderBlockWrapper>
    </Box>
  );
}
