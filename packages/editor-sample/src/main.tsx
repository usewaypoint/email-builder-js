import React from 'react';
import ReactDOM from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import { EditorConfigurationSchema } from './documents/editor/core';
import { EditorProvider } from './documents/editor/EditorContext';
import getConfiguration from './getConfiguration';
import theme from './theme';

const DEFAULT_VALUE = EditorConfigurationSchema.parse(getConfiguration());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EditorProvider defaultValue={DEFAULT_VALUE}>
        <App />
      </EditorProvider>
    </ThemeProvider>
  </React.StrictMode>
);
