import React from 'react';

import { Button } from '@mui/material';

import { useEditorState } from '../../documents/editor/EditorContext';

export default function ToggleSamplesPanelButton() {
  const [{ samplesDrawerOpen }, setEditorState] = useEditorState();
  const handleClick = () => {
    setEditorState({ samplesDrawerOpen: !samplesDrawerOpen });
  };
  if (samplesDrawerOpen) {
    return <Button onClick={handleClick}>CLOSE</Button>;
  }
  return <Button onClick={handleClick}>OPEN</Button>;
}
