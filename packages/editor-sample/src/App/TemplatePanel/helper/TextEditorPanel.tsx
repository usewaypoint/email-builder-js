import hljs from 'highlight.js';
import jsonHighlighter from 'highlight.js/lib/languages/json';
import xmlHighlighter from 'highlight.js/lib/languages/xml';
import { html } from 'js-beautify';
import React, { useMemo } from 'react';

hljs.registerLanguage('json', jsonHighlighter);
hljs.registerLanguage('html', xmlHighlighter);

type TextEditorPanelProps = {
  type: 'json' | 'html';
  value: string;
};
export default function TextEditorPanel({ type, value }: TextEditorPanelProps) {
  const code = useMemo(() => {
    switch (type) {
      case 'html':
        return hljs.highlight(html(value), { language: 'html' });
      default:
        return hljs.highlight(value, { language: 'json' });
    }
  }, [type, value]);

  return (
    <pre
      style={{ margin: 0, padding: 16 }}
      dangerouslySetInnerHTML={{ __html: code.value }}
      onClick={(ev) => {
        const s = window.getSelection();
        if (s === null) {
          return;
        }
        s.selectAllChildren(ev.currentTarget);
      }}
    />
  );
}
