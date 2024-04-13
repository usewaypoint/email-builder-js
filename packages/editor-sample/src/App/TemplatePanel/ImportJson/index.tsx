import React, { useState } from 'react';

import { Button } from '@mui/material';

import ImportJsonDialog from './ImportJsonDialog';

export default function ImportJson() {
  const [open, setOpen] = useState(false);

  let dialog = null;
  if (open) {
    dialog = <ImportJsonDialog onClose={() => setOpen(false)} />;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Import JSON</Button>
      {dialog}
    </>
  );
}
