import React, { useState } from 'react';

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';

import { resetDocument } from '../../../documents/editor/EditorContext';

import validateJsonStringValue from './validateJsonStringValue';

type ImportJsonDialogProps = {
  onClose: () => void;
};
export default function ImportJsonDialog({ onClose }: ImportJsonDialogProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (ev) => {
    const v = ev.currentTarget.value;
    setValue(v);
    const { error } = validateJsonStringValue(v);
    setError(error ?? null);
  };

  let errorAlert = null;
  if (error) {
    errorAlert = <Alert color="error">{error}</Alert>;
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Import JSON</DialogTitle>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const { error, data } = validateJsonStringValue(value);
          setError(error ?? null);
          if (!data) {
            return;
          }
          resetDocument(data);
          onClose();
        }}
      >
        <DialogContent>
          {errorAlert}
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
