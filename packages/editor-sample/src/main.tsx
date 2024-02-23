import React from 'react';
import ReactDOM from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import { EditorConfigurationSchema } from './documents/editor/core';
import { EditorProvider } from './documents/editor/EditorContext';
import theme from './theme';

function getConfiguration() {
  if (window.location.hash) {
    const encodedString = window.location.hash.slice(1);
    const configurationString = atob(encodedString);
    try {
      return JSON.parse(configurationString);
    } catch {
      console.error(`Couldn't load configuration from hash.`);
    }
  }

  const configurationString = localStorage.getItem('configuration');
  if (typeof configurationString === 'string') {
    try {
      return JSON.parse(configurationString);
    } catch {
      console.error(`Couldn't load configuration from localStorage.`);
    }
  }

  return {
    root: {
      type: 'EmailLayout',
      data: {
        backdropColor: '#e5e7e5',
        canvasColor: '#FFFFFF',
        textColor: '#242424',
        accentColor: '#0b5499',
        fontFamily: 'MODERN_SANS',
        childrenIds: [],
      },
    },
  };
}

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
