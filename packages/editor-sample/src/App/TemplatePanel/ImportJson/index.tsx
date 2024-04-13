import React, { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';

import { resetDocument } from '../../../documents/editor/EditorContext';

export default function ImportJson() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Import JSON</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Import JSON</DialogTitle>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            const data = new FormData(ev.currentTarget);
            const json = data.get('json');
            if (typeof json !== 'string') {
              return;
            }
            try {
              const doc = JSON.parse(json);
              resetDocument(doc);
              setOpen(false);
            } catch {}
          }}
        >
          <DialogContent>
            <Input name="json" type="text" fullWidth rows={10} multiline />
          </DialogContent>
          <DialogActions>
            <Button type="button">Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
