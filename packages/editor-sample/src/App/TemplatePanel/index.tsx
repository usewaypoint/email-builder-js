import React from 'react';

import { Box, Stack, Tab, Tabs } from '@mui/material';

import EditorBlock from '../../documents/editor/EditorBlock';
import { useEditorState } from '../../documents/editor/EditorContext';
import ReaderBlock from '../../documents/reader/ReaderBlock';
import { ReaderProvider } from '../../documents/reader/ReaderContext';
import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton';
import ToggleSamplesPanelButton from '../SamplesDrawer/ToggleSamplesPanelButton';

import HtmlPanel from './HtmlPanel';
import ShareButton from './ShareButton';

export default function TemplatePanel() {
  const [{ document, selectedMainTab }, setEditorState] = useEditorState();

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
      <Stack
        sx={{
          height: 49,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 'appBar',
          px: 1,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleSamplesPanelButton />
        <Stack px={2} direction="row" gap={2} width="100%" justifyContent="space-between" alignItems="center">
          <Tabs value={selectedMainTab} onChange={(_, v) => setEditorState({ selectedMainTab: v })}>
            <Tab value="editor" label="Edit" />
            <Tab value="preview" label="Preview" />
            <Tab value="html" label="HTML" />
            <Tab value="data" label="JSON" />
          </Tabs>

          <ShareButton />
        </Stack>

        <ToggleInspectorPanelButton />
      </Stack>
      <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto' }}>{renderMainPanel()}</Box>
    </>
  );
}
