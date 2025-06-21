import { useMemo } from 'react';
import { useDocument } from '~/context/editor';

export function JsonCanva() {
  const document = useDocument();
  const code = useMemo(() => JSON.stringify(document, null, '  '), [document]);

  return (
    <pre
      style={{
        whiteSpace: 'pre',
        overflow: 'auto',
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.4',
        padding: '16px',
        border: '1px solid #e1e1e1',
        borderRadius: '4px',
        backgroundColor: '#f8f9fa',
      }}
      onClick={(e) => {
        const selection = window.getSelection();
        if (selection) {
          selection.selectAllChildren(e.currentTarget);
        }
      }}
    >
      <code>{code}</code>
    </pre>
  );
}
