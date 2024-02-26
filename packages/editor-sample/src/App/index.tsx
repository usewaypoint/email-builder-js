import React from 'react';

import { Stack, useTheme } from '@mui/material';

import { useEditorState } from '../documents/editor/EditorContext';

import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
import SamplesDrawer, { SAMPLES_DRAWER_WIDTH } from './SamplesDrawer';
import TemplatePanel from './TemplatePanel';

export default function App() {
  const theme = useTheme();
  const [{ inspectorDrawerOpen, samplesDrawerOpen }] = useEditorState();

  return (
    <>
      <InspectorDrawer />
      <SamplesDrawer />

      <Stack
        sx={{
          marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
          marginLeft: samplesDrawerOpen ? `${SAMPLES_DRAWER_WIDTH}px` : 0,

          transition: [
            theme.transitions.create('margin-left', {
              easing: !samplesDrawerOpen ? theme.transitions.easing.sharp : theme.transitions.easing.easeOut,
              duration: !samplesDrawerOpen
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
            theme.transitions.create('margin-right', {
              easing: !inspectorDrawerOpen ? theme.transitions.easing.sharp : theme.transitions.easing.easeOut,
              duration: !inspectorDrawerOpen
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
          ].join(', '),
        }}
      >
        <TemplatePanel />
      </Stack>
    </>
  );
}
