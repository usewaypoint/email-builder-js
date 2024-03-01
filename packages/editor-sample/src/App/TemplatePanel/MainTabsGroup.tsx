import React from 'react';

import { CodeOutlined, DataObjectOutlined, EditOutlined, PreviewOutlined } from '@mui/icons-material';
import { Tab, Tabs, Tooltip } from '@mui/material';

import { setSelectedMainTab, useSelectedMainTab } from '../../documents/editor/EditorContext';

export default function MainTabsGroup() {
  const selectedMainTab = useSelectedMainTab();
  const handleChange = (_: unknown, v: unknown) => {
    switch (v) {
      case 'data':
      case 'editor':
      case 'preview':
      case 'html':
        setSelectedMainTab(v);
        return;
      default:
        setSelectedMainTab('data');
    }
  };

  return (
    <Tabs value={selectedMainTab} onChange={handleChange}>
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
  );
}
