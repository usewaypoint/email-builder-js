import React from 'react';

import { Box, Button, Drawer, Stack, Tab, Tabs, useTheme } from '@mui/material';

import EditorBlock from '../documents/editor/EditorBlock';
import { useEditorState } from '../documents/editor/EditorContext';
import ReaderBlock from '../documents/reader/ReaderBlock';
import { ReaderProvider } from '../documents/reader/ReaderContext';

import ExamplesButton from './ExamplesButton';
import HtmlPanel from './panels/HtmlPanel';
import ShareButton from './ShareButton';
import ConfigurationPanel from './sidebar/ConfigurationPanel';
import StylesPanel from './sidebar/StylesPanel';

const drawerWidth = 400;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),

//   ...(open && {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

export default function App() {
  const theme = useTheme();
  const [{ document, selectedSidebarTab, selectedMainTab, sidebarPanelOpen }, setEditorState] = useEditorState();

  const openSidebarPanel = () => {
    setEditorState({ sidebarPanelOpen: true });
  };
  const closeSidebarPanel = () => {
    setEditorState({ sidebarPanelOpen: false });
  };

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
        anchor="left"
        open={sidebarPanelOpen}
        sx={{
          width: sidebarPanelOpen ? drawerWidth : 0,
        }}
      >
        <Box sx={{ width: drawerWidth, height: 49, borderBottom: 1, borderColor: 'divider' }}>
          <Box px={2}>
            <Tabs value={selectedSidebarTab} onChange={(_, v) => setEditorState({ selectedSidebarTab: v })}>
              <Tab value="styles" label="Styles" />
              <Tab value="block-configuration" label="Inspect" />
            </Tabs>
            <Button onClick={() => closeSidebarPanel()}>CLOSE</Button>
          </Box>
        </Box>
        <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto' }}>{renderCurrentSidebarPanel()}</Box>
      </Drawer>
      <Stack
        sx={{
          // flexGrow: 1,
          marginLeft: sidebarPanelOpen ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(sidebarPanelOpen && {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Stack
          sx={{ height: 49, borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button onClick={() => openSidebarPanel()}>OPEN</Button>
          <Tabs value={selectedMainTab} onChange={(_, v) => setEditorState({ selectedMainTab: v })}>
            <Tab value="editor" label="Edit" />
            <Tab value="preview" label="Preview" />
            <Tab value="html" label="HTML" />
            <Tab value="data" label="JSON" />
          </Tabs>
          <Box pr={3}>
            <ExamplesButton />
            <ShareButton />
          </Box>
        </Stack>
        <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto' }}>{renderMainPanel()}</Box>
      </Stack>
    </>
  );
}
