import * as React from 'react';

type TextEditorPanelProps = {
  value: string;
};
export default function TextEditorPanel({ value }: TextEditorPanelProps) {
  return (
    <textarea
      style={{
        padding: 16,
        resize: 'none',
        borderWidth: 0,
        height: '100%',
        width: '100%',
        outline: 0,
        boxSizing: 'border-box',
      }}
    >
      {value}
    </textarea>
  );
}
