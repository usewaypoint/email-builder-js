import { useMemo } from 'react';
import { useDocument } from '~/context/editor';

export function JsonCanva() {
  const document = useDocument();
  const code = useMemo(() => JSON.stringify(document, null, '  '), [document]);

  return (
    <pre
      className="whitespace-pre overflow-auto font-mono text-sm leading-relaxed p-4 border rounded-lg bg-muted"
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
