import { UpdateBlockInputSchema, ToolResponse } from '../types/index.js';
import { deepMerge } from '../utils/block-factory.js';
import * as storage from '../services/template-storage.js';
import { renderTemplate } from '../services/renderer.js';

/**
 * Update a block's properties or styling
 */
export function updateBlock(input: unknown): ToolResponse {
  // Validate input
  const result = UpdateBlockInputSchema.safeParse(input);
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

  const { templateId, blockId, props, style } = result.data;

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

  // Check if block exists
  const block = template.document[blockId];
  if (!block) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: true,
            code: 'BLOCK_NOT_FOUND',
            message: `Block with ID ${blockId} not found`,
          }),
        },
      ],
      isError: true,
    };
  }

  try {
    // Clone document and block
    const document = { ...template.document };
    const updatedBlock = { ...block };
    const data = { ...block.data } as Record<string, unknown>;

    // Handle EmailLayout (props are at data level, not nested)
    if (block.type === 'EmailLayout') {
      if (props) {
        Object.assign(data, props);
      }
      // EmailLayout doesn't have a separate style object
    } else {
      // For other blocks, merge props and style
      if (props) {
        const existingProps = (data.props as Record<string, unknown>) ?? {};
        data.props = deepMerge(existingProps, props as Record<string, unknown>);
      }
      if (style) {
        const existingStyle = (data.style as Record<string, unknown>) ?? {};
        data.style = deepMerge(existingStyle, style as Record<string, unknown>);
      }
    }

    updatedBlock.data = data;
    document[blockId] = updatedBlock;

    // Update template
    storage.updateTemplate(templateId, document);

    // Render HTML
    const html = renderTemplate(document);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            message: `Updated block ${blockId}`,
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
