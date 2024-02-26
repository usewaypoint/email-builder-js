import React from 'react';

import { Button } from '@mui/material';

import { useEditorState } from '../../documents/editor/EditorContext';

export default function ToggleInspectorPanelButton() {
  const [{ inspectorDrawerOpen }, setEditorState] = useEditorState();
  const handleClick = () => {
    setEditorState({ inspectorDrawerOpen: !inspectorDrawerOpen });
  };
  if (inspectorDrawerOpen) {
    return <Button onClick={handleClick}>CLOSE</Button>;
  }
  return <Button onClick={handleClick}>OPEN</Button>;
}
