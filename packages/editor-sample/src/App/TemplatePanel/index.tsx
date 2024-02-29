import React from 'react';

import { CodeOutlined, DataObjectOutlined, EditOutlined, PreviewOutlined } from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, Tooltip } from '@mui/material';

import EditorBlock from '../../documents/editor/EditorBlock';
import { setEditorState, useDocument, useSelectedMainTab } from '../../documents/editor/EditorContext';
import ReaderBlock from '../../documents/reader/ReaderBlock';
import { ReaderProvider } from '../../documents/reader/ReaderContext';
import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton';
import ToggleSamplesPanelButton from '../SamplesDrawer/ToggleSamplesPanelButton';

import HtmlPanel from './HtmlPanel';
import ShareButton from './ShareButton';

export default function TemplatePanel() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();

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
            <Tab
              value="editor"
              label={
                <Tooltip title="Edit">
                  <EditOutlined fontSize="small" />
                </Tooltip>
              }
            />
            <Tab
              value="preview"
              label={
                <Tooltip title="Preview">
                  <PreviewOutlined fontSize="small" />
                </Tooltip>
              }
            />
            <Tab
              value="html"
              label={
                <Tooltip title="HTML output">
                  <CodeOutlined fontSize="small" />
                </Tooltip>
              }
            />
            <Tab
              value="data"
              label={
                <Tooltip title="JSON output">
                  <DataObjectOutlined fontSize="small" />
                </Tooltip>
              }
            />
          </Tabs>

          <ShareButton />
        </Stack>

        <ToggleInspectorPanelButton />
      </Stack>
      <Box sx={{ height: 'calc(100% - 49px)', overflow: 'auto', minWidth: 370 }}>{renderMainPanel()}</Box>
    </>
  );
}
