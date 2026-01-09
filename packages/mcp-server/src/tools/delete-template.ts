import { DeleteTemplateInputSchema, ToolResponse } from '../types/index.js';
import * as storage from '../services/template-storage.js';

/**
 * Delete a stored template
 */
export function deleteTemplate(input: unknown): ToolResponse {
  // Validate input
  const result = DeleteTemplateInputSchema.safeParse(input);
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

  // Delete template
  const deleted = storage.deleteTemplate(templateId);
  if (!deleted) {
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

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          message: `Deleted template ${templateId}`,
        }),
      },
    ],
  };
}
