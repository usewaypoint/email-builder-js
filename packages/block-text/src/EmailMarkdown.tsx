import { marked, Renderer, Tokens } from 'marked';
import React, { CSSProperties, useMemo } from 'react';

import sanitize, { SanitizerOptions } from './sanitizer';

const ALLOWED_TAGS: string[] = [
  'a',
  'article',
  'b',
  'blockquote',
  'br',
  'caption',
  'code',
  'del',
  'details',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'ins',
  'kbd',
  'li',
  'main',
  'ol',
  'p',
  'pre',
  'section',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
];
const GENERIC_ALLOWED_ATTRIBUTES = ['style', 'title'];

export const SANITIZER_OPTIONS: SanitizerOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedAttributes: {
    ...ALLOWED_TAGS.reduce<Record<string, string[]>>((res, tag) => {
      res[tag] = [...GENERIC_ALLOWED_ATTRIBUTES];
      return res;
    }, {}),
    img: ['src', 'alt', 'width', 'height', ...GENERIC_ALLOWED_ATTRIBUTES],
    table: ['width', ...GENERIC_ALLOWED_ATTRIBUTES],
    td: ['align', 'width', ...GENERIC_ALLOWED_ATTRIBUTES],
    th: ['align', 'width', ...GENERIC_ALLOWED_ATTRIBUTES],
    a: ['href', 'target', ...GENERIC_ALLOWED_ATTRIBUTES],
    ol: ['start', ...GENERIC_ALLOWED_ATTRIBUTES],
    ul: ['start', ...GENERIC_ALLOWED_ATTRIBUTES],
  },
  filter: (token) => {
    if (token.tag === 'a' && 'href' in token.attrs && token.attrs.href === undefined) {
      token.attrs.href = '';
    }
    if (token.tag === 'img' && 'src' in token.attrs && token.attrs.src === undefined) {
      token.attrs.src = '';
    }
    return true;
  },
};

function sanitizer(html: string): string {
  return sanitize(html, SANITIZER_OPTIONS);
}

const UNESCAPED_HTML_CHARS = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g;
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  [`'`]: '&#39;',
};

function escapeHtml(value: string): string {
  return value.replace(UNESCAPED_HTML_CHARS, (char) => HTML_ESCAPES[char]);
}

class CustomRenderer extends Renderer {
  table({ header, rows }: Tokens.Table) {
    return `<table width="100%">
<thead>
${this.renderTableRow(header)}</thead>
<tbody>
${rows.map((row) => this.renderTableRow(row)).join('')}</tbody>
</table>`;
  }

  private renderTableRow(cells: Tokens.TableCell[]) {
    return this.tablerow({ text: cells.map((cell) => this.tablecell(cell)).join('') });
  }

  link({ href, title, tokens }: Tokens.Link) {
    const text = this.parser.parseInline(tokens);
    if (!title) {
      return `<a href="${href}" target="_blank">${text}</a>`;
    }
    return `<a href="${href}" title="${escapeHtml(title)}" target="_blank">${text}</a>`;
  }
}

export function renderMarkdownString(str: string): string {
  const html = marked.parse(str, {
    async: false,
    breaks: true,
    gfm: true,
    pedantic: false,
    silent: false,
    renderer: new CustomRenderer(),
  });
  return sanitizer(html);
}

type Props = {
  style: CSSProperties;
  markdown: string;
};
export default function EmailMarkdown({ markdown, ...props }: Props) {
  const data = useMemo(() => renderMarkdownString(markdown), [markdown]);
  return <div {...props} dangerouslySetInnerHTML={{ __html: data }} />;
}
