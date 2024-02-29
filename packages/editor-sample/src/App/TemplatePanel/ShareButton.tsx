import React, { useState } from 'react';

import { IosShareOutlined } from '@mui/icons-material';
import { IconButton, Snackbar, Tooltip } from '@mui/material';

import { useDocument } from '../../documents/editor/EditorContext';

export default function ShareButton() {
  const document = useDocument();
  const [message, setMessage] = useState<string | null>(null);

  const onClick = async () => {
    const c = JSON.stringify(document);
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
      <IconButton onClick={onClick}>
        <Tooltip title="Share current template">
          <IosShareOutlined fontSize="small" />
        </Tooltip>
      </IconButton>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message !== null}
        onClose={onClose}
        message={message}
      />
    </>
  );
}
