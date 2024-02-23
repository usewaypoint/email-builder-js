import React, { useState } from 'react';

import { Button, Snackbar } from '@mui/material';

import { useEditorState } from '../documents/editor/EditorContext';

export default function ShareButton() {
  const [{ document }] = useEditorState();
  const [message, setMessage] = useState<string | null>(null);

  const onClick = async () => {
    const c = JSON.stringify(document);
    localStorage.setItem('configuration', c);
    location.hash = `#${btoa(c)}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(location.href.toString());
      setMessage('The configuration URL was copied to your clipboard');
    } else {
      setMessage('The URL was updated. You can copy it to share');
    }
  };

  const onClose = () => {
    setMessage(null);
  };

  return (
    <>
      <Button onClick={onClick}>Share</Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message !== null}
        onClose={onClose}
        message={message}
      />
    </>
  );
}
