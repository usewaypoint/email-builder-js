import { CreateTemplateInputSchema, ToolResponse, TReaderDocument } from '../types/index.js';
import { generateTemplateId } from '../utils/id-generator.js';
import { createEmailLayout } from '../utils/block-factory.js';
import * as storage from '../services/template-storage.js';
import { renderTemplate } from '../services/renderer.js';

/**
 * Create a new email template
 */
export function createTemplate(input: unknown): ToolResponse {
  // Validate input
  const result = CreateTemplateInputSchema.safeParse(input);
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

  const { name, backdropColor, canvasColor, textColor, fontFamily } = result.data;

  try {
    // Generate template ID
    const templateId = generateTemplateId();

    // Create root EmailLayout block
    const rootBlock = createEmailLayout({
      backdropColor,
      canvasColor,
      textColor,
      fontFamily,
    });

    // Create document
    const document: TReaderDocument = {
      root: rootBlock,
    };

    // Save template
    const templateName = name ?? `Template ${new Date().toLocaleString()}`;
    storage.createTemplate(templateId, templateName, document);

    // Render HTML
    const html = renderTemplate(document);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            templateId,
            message: `Created template "${templateName}"`,
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
            code: 'STORAGE_ERROR',
            message,
          }),
        },
      ],
      isError: true,
    };
  }
}
