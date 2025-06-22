import { renderToStaticMarkup } from '@usewaypoint/email-builder';
import { useMemo } from 'react';
import { useDocument } from '~/context/editor';

function formatHtml(html: string): string {
  let formatted = '';
  let indent = 0;
  const tab = '  '; // 2 spaces for indentation

  // Remove existing whitespace between tags
  html = html.replace(/>\s+</g, '><');

  // Split into tokens
  const tokens = html.split(/(<\/?[^>]+>)/);

  for (let token of tokens) {
    if (!token.trim()) continue;

    if (token.match(/<\/\w[^>]*>/)) {
      // Closing tag
      indent--;
      formatted += tab.repeat(Math.max(0, indent)) + token + '\n';
    } else if (token.match(/<\w[^>]*\/>/)) {
      // Self-closing tag
      formatted += tab.repeat(indent) + token + '\n';
    } else if (token.match(/<\w[^>]*>/)) {
      // Opening tag
      formatted += tab.repeat(indent) + token + '\n';
      indent++;
    } else {
      // Text content
      if (token.trim()) {
        formatted += tab.repeat(indent) + token.trim() + '\n';
      }
    }
  }

  return formatted.trim();
}

export function HtmlCanva() {
  const document = useDocument();
  const rawCode = useMemo(() => renderToStaticMarkup(document, { rootBlockId: 'root' }), [document]);
  const code = useMemo(() => formatHtml(rawCode), [rawCode]);

  return (
    <pre
      className="whitespace-pre overflow-auto font-mono text-sm leading-relaxed m-2 p-4 border rounded-lg bg-muted"
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
