import * as storage from '../services/template-storage.js';
import { renderTemplate } from '../services/renderer.js';

/**
 * Extract template ID from a preview resource URI
 * URI format: template://{templateId}/preview
 */
export function extractTemplateId(uri: string): string | null {
  const match = uri.match(/^template:\/\/([^/]+)\/preview$/);
  return match ? match[1] : null;
}

/**
 * Get template preview HTML for a resource request
 */
export function getTemplatePreview(uri: string): { content: string; mimeType: string } | null {
  const templateId = extractTemplateId(uri);
  if (!templateId) {
    return null;
  }

  const template = storage.getTemplate(templateId);
  if (!template) {
    return null;
  }

  try {
    const html = renderTemplate(template.document);
    return {
      content: html,
      mimeType: 'text/html',
    };
  } catch {
    return null;
  }
}

/**
 * List all available template preview resources
 */
export function listTemplatePreviewResources(): Array<{
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}> {
  const templates = storage.listTemplates();
  return templates.map((t) => ({
    uri: `template://${t.id}/preview`,
    name: `${t.name} Preview`,
    description: `HTML preview of email template "${t.name}"`,
    mimeType: 'text/html',
  }));
}
