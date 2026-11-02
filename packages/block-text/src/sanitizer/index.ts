import { decode, encode } from 'he';

import { sanitizeHtml, SanitizerOptions } from './sanitizer';

export type { SanitizerOptions, SanitizerToken } from './sanitizer';

export default function sanitize(html: string, options: SanitizerOptions): string {
  return sanitizeHtml(html, options, { encode, decode });
}
