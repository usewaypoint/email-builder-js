import { renderToStaticMarkup as emailRender, TReaderDocument as EmailReaderDocument } from '@usewaypoint/email-builder';
import { TReaderDocument } from '../types/index.js';

/**
 * Render a template document to HTML
 */
export function renderTemplate(document: TReaderDocument): string {
  try {
    // Cast to the email-builder's expected type
    const html = emailRender(document as unknown as EmailReaderDocument, { rootBlockId: 'root' });
    return html;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[MCP] Render error: ${message}`);
    throw new Error(`Failed to render template: ${message}`);
  }
}
