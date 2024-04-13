import React, { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';

import { resetDocument } from '../../../documents/editor/EditorContext';

type ImportJsonDialogProps = {
  onClose: () => void;
};
export default function ImportJsonDialog({ onClose }: ImportJsonDialogProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (ev) => {
    const v = ev.currentTarget.value;
    setValue(v);
    try {
      JSON.parse(v);
      setError(null);
    } catch {
      setError('There was a parsing error');
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Import JSON</DialogTitle>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          try {
            const doc = JSON.parse(value);
            resetDocument(doc);
            onClose();
          } catch {}
        }}
      >
        <DialogContent>
          <Input
            error={error !== null}
            value={value}
            onChange={handleChange}
            type="text"
            fullWidth
            rows={10}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={error !== null}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
