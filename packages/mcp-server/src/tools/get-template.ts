import { GetTemplateInputSchema, ToolResponse } from '../types/index.js';
import * as storage from '../services/template-storage.js';
import { renderTemplate } from '../services/renderer.js';

/**
 * Get the full JSON template (for export)
 */
export function getTemplate(input: unknown): ToolResponse {
  // Validate input
  const result = GetTemplateInputSchema.safeParse(input);
  if (!result.success) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: true,
            code: 'VALIDATION_ERROR',
            message: result.error.message,
          }),
        },
      ],
      isError: true,
    };
  }

  const { templateId } = result.data;

  // Get template
  const template = storage.getTemplate(templateId);
  if (!template) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: true,
            code: 'TEMPLATE_NOT_FOUND',
            message: `Template with ID ${templateId} not found`,
          }),
        },
      ],
      isError: true,
    };
  }

  try {
    // Render HTML
    const html = renderTemplate(template.document);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            template: template.document,
            metadata: template.metadata,
            html,
          }),
        },
      ],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: true,
            code: 'RENDER_ERROR',
            message,
          }),
        },
      ],
      isError: true,
    };
  }
}
