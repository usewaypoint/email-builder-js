import React from 'react';

import { Box, Button, Drawer, Stack, Tab, Tabs, useTheme } from '@mui/material';

import EditorBlock from '../documents/editor/EditorBlock';
import { useEditorState } from '../documents/editor/EditorContext';
import ReaderBlock from '../documents/reader/ReaderBlock';
import { ReaderProvider } from '../documents/reader/ReaderContext';

import ExamplesButton from './ExamplesButton';
import HtmlPanel from './panels/HtmlPanel';
import SamplesPanel from './SamplesPanel';
import ShareButton from './ShareButton';
import ConfigurationPanel from './sidebar/ConfigurationPanel';
import StylesPanel from './sidebar/StylesPanel';

const drawerWidth = 400;

export default function App() {
  const theme = useTheme();
  const [{ document, selectedSidebarTab, selectedMainTab, inspectorPanelOpen, samplesPanelOpen }, setEditorState] =
    useEditorState();

  const renderCurrentSidebarPanel = () => {
    switch (selectedSidebarTab) {
      case 'block-configuration':
        return <ConfigurationPanel />;
      case 'styles':
        return <StylesPanel />;
    }
  };
  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return <EditorBlock id="root" />;
      case 'preview':
        return (
          <ReaderProvider value={document}>
            <ReaderBlock id="root" />
          </ReaderProvider>
        );
      case 'html':
        return <HtmlPanel />;
      case 'data':
        return (
          <Box p={3}>
            <pre>{JSON.stringify(document, null, '  ')}</pre>
          </Box>
        );
    }
  };

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="right"
        open={inspectorPanelOpen}
        sx={{
          width: inspectorPanelOpen ? drawerWidth : 0,
        }}
      >
        <Box sx={{ width: drawerWidth, height: 49, borderBottom: 1, borderColor: 'divider' }}>
          <Box px={2}>
            <Tabs value={selectedSidebarTab} onChange={(_, v) => setEditorState({ selectedSidebarTab: v })}>
              <Tab value="styles" label="Styles" />
              <Tab value="block-configuration" label="Inspect" />
            </Tabs>
          </Box>
        </Box>
        <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto' }}>{renderCurrentSidebarPanel()}</Box>
      </Drawer>

      <Drawer
        variant="persistent"
        anchor="left"
        open={samplesPanelOpen}
        sx={{
          width: samplesPanelOpen ? drawerWidth : 0,
        }}
      >
        <Box width={drawerWidth}>
          <SamplesPanel />
        </Box>
      </Drawer>

      <Stack
        sx={{
          marginRight: inspectorPanelOpen ? `${drawerWidth}px` : 0,
          marginLeft: samplesPanelOpen ? `${drawerWidth}px` : 0,

          transition: [
            theme.transitions.create('margin-left', {
              easing: !samplesPanelOpen ? theme.transitions.easing.sharp : theme.transitions.easing.easeOut,
              duration: !samplesPanelOpen
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
            theme.transitions.create('margin-right', {
              easing: !inspectorPanelOpen ? theme.transitions.easing.sharp : theme.transitions.easing.easeOut,
              duration: !inspectorPanelOpen
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
          ].join(', '),
        }}
      >
        <Stack
          sx={{ height: 49, borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ToggleSamplesPanelButton />
          <Tabs value={selectedMainTab} onChange={(_, v) => setEditorState({ selectedMainTab: v })}>
            <Tab value="editor" label="Edit" />
            <Tab value="preview" label="Preview" />
            <Tab value="html" label="HTML" />
            <Tab value="data" label="JSON" />
          </Tabs>
          <Box pr={3}>
            <ExamplesButton />
            <ShareButton />
            <ToggleInspectorPanelButton />
          </Box>
        </Stack>
        <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto' }}>{renderMainPanel()}</Box>
      </Stack>
    </>
  );
}

function ToggleSamplesPanelButton() {
  const [{ samplesPanelOpen }, setEditorState] = useEditorState();
  const handleClick = () => {
    setEditorState({ samplesPanelOpen: !samplesPanelOpen });
  };
  if (samplesPanelOpen) {
    return <Button onClick={handleClick}>CLOSE</Button>;
  }
  return <Button onClick={handleClick}>OPEN</Button>;
}

function ToggleInspectorPanelButton() {
  const [{ inspectorPanelOpen }, setEditorState] = useEditorState();
  const handleClick = () => {
    setEditorState({ inspectorPanelOpen: !inspectorPanelOpen });
  };
  if (inspectorPanelOpen) {
    return <Button onClick={handleClick}>CLOSE</Button>;
  }
  return <Button onClick={handleClick}>OPEN</Button>;
}
