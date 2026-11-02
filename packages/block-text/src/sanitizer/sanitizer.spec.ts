/* eslint-disable quotes, no-control-regex, @typescript-eslint/no-require-imports */
import type { Tokens } from 'marked';
import path from 'path';

import { describe, expect, it, jest } from '@jest/globals';

import { renderMarkdownString, SANITIZER_OPTIONS } from '../EmailMarkdown';

import sanitize from '.';
import { matchEndTag, matchStartTag } from './parser';
import { EntityCodec, sanitizeHtml } from './sanitizer';

type Insane = (html: string, options: object) => string;

const insaneDir = path.dirname(require.resolve('insane/package.json'));
const he = require('he') as EntityCodec;
const she = require('../../she.mjs') as EntityCodec;

function loadInsane(codec: 'he' | 'she'): Insane {
  let insane: Insane | undefined;
  jest.isolateModules(() => {
    if (codec === 'she') {
      jest.doMock(require.resolve('he', { paths: [insaneDir] }), () => require(path.join(insaneDir, 'she.js')));
    }
    insane = require('insane') as Insane;
  });
  return insane as Insane;
}

const insaneHe = loadInsane('he');
const insaneShe = loadInsane('she');

function reference(insane: Insane, html: string): string | null {
  try {
    return insane(html, SANITIZER_OPTIONS);
  } catch {
    return null;
  }
}

function expectSameAsInsane(insane: Insane, codec: EntityCodec, html: string) {
  const expected = reference(insane, html);
  const actual = sanitizeHtml(html, SANITIZER_OPTIONS, codec);
  if (expected !== null) {
    expect(actual).toBe(expected);
  }
}

function time(fn: () => void): number {
  let best = Infinity;
  for (let i = 0; i < 3; i++) {
    const start = performance.now();
    fn();
    best = Math.min(best, performance.now() - start);
  }
  return best;
}

function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

const FUZZ_TOKENS = [
  '<',
  '>',
  '/',
  '</',
  '/>',
  ' ',
  '  ',
  '\n',
  '\t',
  '=',
  '"',
  "'",
  '-',
  ':',
  '_',
  'a',
  'b',
  'p',
  'img',
  'div',
  'span',
  'script',
  'iframe',
  'br',
  'hr',
  'table',
  'td',
  'class',
  'src',
  'href',
  'style',
  'title',
  'width',
  'onerror',
  'javascript:',
  'JaVaScRiPt:',
  'http://example.com/a?b=1&c=2',
  'https:',
  'mailto:x@y.z',
  'ftp:',
  'data:',
  '#',
  '?',
  '&amp;',
  '&lt;',
  '&#106;',
  '&#x6A;',
  '&quot;',
  '&nbsp;',
  '&copy',
  'é',
  '😀',
  '`',
  '<!--',
  '-->',
  'constructor',
  '__proto__',
  'x',
  '1',
];

function fuzzInput(random: () => number): string {
  const length = 1 + Math.floor(random() * 24);
  let out = '';
  for (let i = 0; i < length; i++) {
    out += FUZZ_TOKENS[Math.floor(random() * FUZZ_TOKENS.length)];
  }
  return out;
}

const TAG_PARTS = [
  ' ',
  '  ',
  '\n',
  '=',
  ' = ',
  '"',
  "'",
  '/',
  '>',
  '-',
  ':',
  'x',
  'ab',
  '"v"',
  "'v'",
  '"a>b"',
  "'a\"b'",
  'v/',
];

function fuzzTag(random: () => number): string {
  const pick = (list: string[]) => list[Math.floor(random() * list.length)];
  let out = '<' + (random() < 0.2 ? ' ' : '') + pick(['a', 'img', 'b-c', 'x:y']);
  const attributes = Math.floor(random() * 6);
  for (let i = 0; i < attributes; i++) {
    out += pick([' ', '  ', '\n']) + pick(['href', 'b', 'data-x', 'x:y']);
    if (random() < 0.7) {
      out +=
        pick(['=', ' =', '= ', ' = ']) +
        pick(['"q"', "'q'", 'u', '"a>b"', "'a>b'", '"', "'", 'u/', '-=""', '""', 'x"y']);
    }
    if (random() < 0.2) {
      out += pick(TAG_PARTS);
    }
  }
  out += pick(['', ' ', '/', ' /', '/ ', ' / ']) + pick(['>', '>', '>', '', 'x>', '"']);
  if (random() < 0.5) {
    out += pick(TAG_PARTS) + pick(TAG_PARTS) + pick(TAG_PARTS);
  }
  return out;
}

function referenceStartTag(s: string) {
  const m = s.match(/^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/);
  return m ? { length: m[0].length, tagName: m[1], rest: m[2], unary: m[3] } : null;
}

function referenceEndTag(s: string) {
  const m = s.match(/^<\s*\/\s*([\w:-]+)[^>]*>/);
  return m ? { length: m[0].length, tagName: m[1] } : null;
}

const MARKDOWN_FIXTURES = [
  '',
  'Hello world',
  '# Heading\n\nParagraph with **bold**, *italic*, ~~strike~~ and `code`.',
  'Line one\nLine two\n\nNew paragraph',
  '- One\n- Two\n  - Nested\n- Three',
  '1. First\n2. Second\n3. Third',
  '5. Starts at five\n6. Six',
  '> A quote\n> spanning lines',
  '```js\nconst a = 1 < 2 && 3 > 2;\n```',
  '| Name | Value |\n| :--- | ---: |\n| a | 1 |\n| b | 2 |',
  'Visit [our site](https://example.com/path?a=1&b=2 "Title & more") today.',
  'Mail [us](mailto:hello@example.com) or call [phone](tel:+123456)',
  '[relative](/pricing) [anchor](#top) [query](?ref=mail) [placeholder]({{unsubscribe_url}})',
  'Hi {{name}}, your code is **{{code}}**.',
  '![Logo](https://example.com/logo.png "Logo")',
  '![](https://example.com/a.png) <img src="https://example.com/b.png" width="100" height="20" alt="B">',
  'Raw <span style="color: red" onclick="alert(1)">span</span> and <b>bold</b>',
  '<div align="center"><p>Centered?</p></div>',
  '<table><tr><td align="right" width="50%">cell</td></tr></table>',
  '<details><summary>More</summary>Hidden text</details>',
  'Unicode: Привет, мир! 😀 — “quotes” ‘single’ © ® ™ € £',
  '[Привет](https://example.com/путь?q=тест "Заголовок")',
  'Entities: &amp; &lt; &gt; &quot; &#39; &nbsp; &copy; &#169; &#xA9;',
  '<a href="https://example.com/?a=1&amp;b=2&#38;c=3">amp link</a>',
  '<a href="&#106;avascript:alert(1)">entity js</a>',
  '<a href="java&#x09;script:alert(1)">tab js</a>',
  '<a href="http://example.com" target="_self" rel="noopener">target</a>',
  'Footnote-ish[^1] and HTML comment <!-- hidden --> here',
  '***\n\n---\n\n___',
  'Trailing spaces for break  \nnext line',
  'A <script>alert(1)</script> B <style>p{}</style> C <iframe src="https://x"></iframe> D',
  '<p class="lead" id="x" data-x="1">attrs</p>',
  '<img src="cid:logo123"> <img src="data:image/png;base64,AAAA">',
  '<UL><LI>Upper</LI></UL>',
  '<a href=https://example.com/unquoted>unquoted</a>',
  "<a href='https://example.com/single'>single</a>",
  '<br/><br /><hr/>',
  '<b>unclosed <i>nested',
  '</b> stray close',
  '<foo bar= baz>unknown</foo>',
  '<p title="a > b">gt in attr</p>',
];

const XSS_FIXTURES = [
  '[a](javascript:prompt(document.cookie))',
  "[Basic](javascript:alert('Basic'))",
  "[CaseInsensitive](JaVaScRiPt:alert('CaseInsensitive'))",
  "[URL](javascript://www.google.com%0Aalert('URL'))",
  '[a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)',
  '[a](vbscript:msgbox(1))',
  '<a href="javascript:alert(1)">x</a>',
  '<a href=" javascript:alert(1)">x</a>',
  '<a href="&#106;avascript:alert(1)">x</a>',
  '<a href="&#x6A;avascript:alert(1)">x</a>',
  '<a href="java&#x09;script:alert(1)">x</a>',
  '<a href="javascript&colon;alert(1)">x</a>',
  '<img src="javascript:alert(1)">',
  '<img src=x onerror=alert(1)>',
  '<svg onload=alert(1)>',
  '<a href="data:text/html,<script>alert(1)</script>">x</a>',
];

function hasActiveScriptUrl(html: string): boolean {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elements = Array.from(doc.querySelectorAll('*'));
  return elements.some((el) =>
    Array.from(el.attributes).some((attr) => {
      if (/^on/i.test(attr.name)) {
        return true;
      }
      if (['href', 'src'].includes(attr.name.toLowerCase())) {
        const normalized = attr.value.replace(/[\t\n\r]/g, '').replace(/^[\u0000- ]+/, '');
        return /^(javascript|vbscript|data):/i.test(normalized);
      }
      return false;
    })
  );
}

describe('vendored sanitizer', () => {
  describe('ReDoS (GHSA-w455-mfq9-hf74 / CVE-2020-26303)', () => {
    it('handles the advisory payload in linear time', () => {
      const limits: [number, number][] = [
        [30, 50],
        [1000, 50],
        [20000, 50],
        [100000, 250],
      ];
      for (const [n, limit] of limits) {
        const payload = '<b>foo</b><foo bar= ' + ' -=""'.repeat(n);
        let result = '';
        const elapsed = time(() => {
          result = sanitize(payload, SANITIZER_OPTIONS);
        });
        expect(result).toBe('<b>foo</b>');
        expect(elapsed).toBeLessThan(limit);
      }
    });

    it('handles the advisory payload through the markdown pipeline', () => {
      // marked passes an HTML block that starts with a block-level tag through verbatim,
      // so this variant reaches the sanitizer (insane@2.6.2 needs ~0.7s at n=25, doubling per step)
      for (const prefix of ['<div bar= ', '<b>foo</b><foo bar= ']) {
        const payload = prefix + ' -=""'.repeat(20000);
        expect(time(() => renderMarkdownString(payload))).toBeLessThan(50);
      }
    });

    it('handles other pathological tag shapes in linear time', () => {
      const payloads = [
        '</' + 'a'.repeat(50000),
        '<a' + ' b=c'.repeat(20000),
        '<a' + ' b=c'.repeat(20000) + '>',
        '<a' + ' b'.repeat(50000),
        '<a b="' + 'x'.repeat(50000),
        "<a b='" + ' c="'.repeat(20000),
        '<a b=' + '/'.repeat(50000),
        '<a' + ' b=x/'.repeat(20000),
        '<a' + ' b= "'.repeat(20000),
        '<'.repeat(50000),
        '<b>x</b>'.repeat(10000),
      ];
      for (const payload of payloads) {
        expect(time(() => sanitize(payload, SANITIZER_OPTIONS))).toBeLessThan(50);
      }
    });
  });

  describe('tag matchers are equivalent to the insane regular expressions', () => {
    it('agrees on random input', () => {
      const random = createRandom(42);
      for (let i = 0; i < 50000; i++) {
        const input = '<' + fuzzInput(random);
        expect(matchStartTag(input)).toEqual(referenceStartTag(input));
        const tag = fuzzTag(random);
        expect(matchStartTag(tag)).toEqual(referenceStartTag(tag));
        const endInput = '</' + fuzzInput(random);
        expect(matchEndTag(endInput)).toEqual(referenceEndTag(endInput));
      }
    });
  });

  describe('output is identical to insane@2.6.2', () => {
    const codecs: [string, EntityCodec, Insane][] = [
      ['he (Node)', he, insaneHe],
      ['she (browser)', she, insaneShe],
    ];

    for (const [name, codec, insane] of codecs) {
      it(`on random input with ${name}`, () => {
        const random = createRandom(7);
        for (let i = 0; i < 30000; i++) {
          expectSameAsInsane(insane, codec, fuzzInput(random));
          expectSameAsInsane(insane, codec, fuzzTag(random) + fuzzInput(random) + fuzzTag(random));
        }
      });

      it(`on markdown fixtures with ${name}`, () => {
        for (const fixture of [...MARKDOWN_FIXTURES, ...XSS_FIXTURES]) {
          const { marked } = require('marked');
          const raw = marked.parse(fixture, { async: false, breaks: true, gfm: true, pedantic: false, silent: false });
          expectSameAsInsane(insane, codec, raw);
          expectSameAsInsane(insane, codec, fixture);
        }
      });
    }

    it('renderMarkdownString matches insane on the fixtures (Node codec)', () => {
      const { marked, Renderer } = require('marked');
      const escapeTitle = (title: string) =>
        title.replace(
          /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
          (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string
        );
      class CustomRenderer extends Renderer {
        table({ header, rows }: Tokens.Table) {
          const renderRow = (cells: Tokens.TableCell[]) =>
            this.tablerow({ text: cells.map((cell) => this.tablecell(cell)).join('') });
          return `<table width="100%">\n<thead>\n${renderRow(header)}</thead>\n<tbody>\n${rows.map(renderRow).join('')}</tbody>\n</table>`;
        }
        link({ href, title, tokens }: Tokens.Link) {
          const text = this.parser.parseInline(tokens);
          if (!title) {
            return `<a href="${href}" target="_blank">${text}</a>`;
          }
          return `<a href="${href}" title="${escapeTitle(title)}" target="_blank">${text}</a>`;
        }
      }
      for (const fixture of [...MARKDOWN_FIXTURES, ...XSS_FIXTURES]) {
        const raw = marked.parse(fixture, {
          async: false,
          breaks: true,
          gfm: true,
          pedantic: false,
          silent: false,
          renderer: new CustomRenderer(),
        });
        expect(renderMarkdownString(fixture)).toBe(reference(insaneHe, raw));
      }
    });

    it('keeps rendered markdown stable', () => {
      expect(MARKDOWN_FIXTURES.map((fixture) => renderMarkdownString(fixture))).toMatchSnapshot();
    });
  });

  describe('URL schemes', () => {
    for (const [name, codec] of [
      ['he', he],
      ['she', she],
    ] as const) {
      it(`neutralizes script URLs with ${name}`, () => {
        for (const fixture of XSS_FIXTURES) {
          const raw = renderMarkdownString(fixture);
          const html = sanitizeHtml(raw, SANITIZER_OPTIONS, codec);
          expect(hasActiveScriptUrl(html)).toBe(false);
        }
      });
    }

    it('keeps safe, relative and placeholder URLs', () => {
      const html = renderMarkdownString(
        '[a](https://example.com) [b](http://example.com) [c](mailto:a@b.c) [d](/x) [e](#y) [f]({{unsubscribe_url}})'
      );
      expect(html).toContain('href="https://example.com"');
      expect(html).toContain('href="http://example.com"');
      expect(html).toContain('href="mailto:a@b.c"');
      expect(html).toContain('href="/x"');
      expect(html).toContain('href="#y"');
      expect(html).toContain('href="{{unsubscribe_url}}"');
    });

    it('does not throw on a valueless class attribute', () => {
      expect(sanitize('<p class>x</p>', SANITIZER_OPTIONS)).toBe('<p>x</p>');
    });
  });
});
