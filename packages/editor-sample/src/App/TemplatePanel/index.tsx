import React from 'react';

import {
  CodeOutlined,
  DataObjectOutlined,
  EditOutlined,
  MonitorOutlined,
  PhoneIphoneOutlined,
  PreviewOutlined,
} from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

import EditorBlock from '../../documents/editor/EditorBlock';
import {
  setEditorState,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
} from '../../documents/editor/EditorContext';
import ReaderBlock from '../../documents/reader/ReaderBlock';
import { ReaderProvider } from '../../documents/reader/ReaderContext';
import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton';
import ToggleSamplesPanelButton from '../SamplesDrawer/ToggleSamplesPanelButton';

import HtmlPanel from './HtmlPanel';
import JsonPanel from './JsonPanel';
import ShareButton from './ShareButton';

export default function TemplatePanel() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();
  const handleScreenSizeChange = (_, value: unknown) => {
    console.log(value);
    switch (value) {
      case 'mobile':
        setEditorState({ selectedScreenSize: 'mobile' });
        return;
      case 'desktop':
      default:
        setEditorState({ selectedScreenSize: 'desktop' });
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
        return <JsonPanel />;
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
          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup value={selectedScreenSize} exclusive size="small" onChange={handleScreenSizeChange}>
              <ToggleButton value="desktop">
                <Tooltip title="Desktop view">
                  <MonitorOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="mobile">
                <Tooltip title="Mobile view">
                  <PhoneIphoneOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <ShareButton />
          </Stack>
        </Stack>

        <ToggleInspectorPanelButton />
      </Stack>
      <Box sx={{ height: 'calc(100vh - 49px)', overflow: 'auto', minWidth: 370 }}>{renderMainPanel()}</Box>
    </>
  );
}
