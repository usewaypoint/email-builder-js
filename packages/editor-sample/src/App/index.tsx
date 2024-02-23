import React from 'react';

import { Box, Grid, Stack, Tab, Tabs } from '@mui/material';

import EditorBlock from '../documents/editor/EditorBlock';
import { useEditorState } from '../documents/editor/EditorContext';
import ReaderBlock from '../documents/reader/ReaderBlock';
import { ReaderProvider } from '../documents/reader/ReaderContext';

import HtmlPanel from './panels/HtmlPanel';
import ShareButton from './ShareButton';
import ConfigurationPanel from './sidebar/ConfigurationPanel';
import StylesPanel from './sidebar/StylesPanel';

export default function App() {
  const [{ document, selectedSidebarTab, selectedMainTab }, setEditorState] = useEditorState();

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
    <Grid container height="100%">
      <Grid item xs={6} sm={6} md="auto" sx={{ height: '100%', backgroundColor: 'white' }}>
        <Box sx={{ height: 49, width: 400, borderBottom: 1, borderColor: 'divider' }}>
          <Box px={2}>
            <Tabs value={selectedSidebarTab} onChange={(_, v) => setEditorState({ selectedSidebarTab: v })}>
              <Tab value="styles" label="Styles" />
              <Tab value="block-configuration" label="Inspect" />
            </Tabs>
          </Box>
        </Box>
        <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto' }}>{renderCurrentSidebarPanel()}</Box>
      </Grid>
      <Grid item xs height="100%" padding={0} margin={0} sx={{ overflowY: 'auto' }}>
        <Stack
          sx={{ height: 49, borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}
          direction="row"
          justifyContent="space-between"
        >
          <Tabs value={selectedMainTab} onChange={(_, v) => setEditorState({ selectedMainTab: v })}>
            <Tab value="editor" label="Edit" />
            <Tab value="preview" label="Preview" />
            <Tab value="html" label="HTML" />
            <Tab value="data" label="JSON" />
          </Tabs>
          <ShareButton />
        </Stack>
        <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto' }}>{renderMainPanel()}</Box>
      </Grid>
    </Grid>
  );
}
