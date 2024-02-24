import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import { EditorProvider } from './documents/editor/EditorContext';
import getConfiguration from './getConfiguration';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfigurationLoader />
    </ThemeProvider>
  </React.StrictMode>
);

function ConfigurationLoader() {
  const [id, setId] = useState(1);
  const [configuration, setConfiguration] = useState(() => getConfiguration(window.location.hash));

  useEffect(() => {
    function refresh() {
      setId(id + 1);
      setConfiguration(getConfiguration(window.location.hash));
    }
    window.addEventListener('hashchange', refresh);
    return () => window.removeEventListener('hashchange', refresh);
  });
  return (
    <EditorProvider key={`root-${id}`} defaultValue={configuration}>
      <App />
    </EditorProvider>
  );
}
