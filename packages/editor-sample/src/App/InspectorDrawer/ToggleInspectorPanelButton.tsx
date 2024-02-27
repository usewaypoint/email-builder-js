import React from 'react';

import { AppRegistrationOutlined, LastPageOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useEditorState } from '../../documents/editor/EditorContext';

export default function ToggleInspectorPanelButton() {
  const [{ inspectorDrawerOpen }, setEditorState] = useEditorState();
  const handleClick = () => {
    setEditorState({ inspectorDrawerOpen: !inspectorDrawerOpen });
  };
  if (inspectorDrawerOpen) {
    return (
      <IconButton onClick={handleClick}>
        <LastPageOutlined fontSize="small" />
      </IconButton>
    );
  }
  return (
    <IconButton onClick={handleClick}>
      <AppRegistrationOutlined fontSize="small" />
    </IconButton>
  );
}
