import { RemoveBlockInputSchema, ToolResponse, TReaderDocument } from '../types/index.js';
import * as storage from '../services/template-storage.js';
import { renderTemplate } from '../services/renderer.js';

/**
 * Remove a block ID from all parent containers
 */
function removeFromAllParents(document: TReaderDocument, blockId: string): void {
  for (const [id, block] of Object.entries(document)) {
    if (id === blockId) continue;

    // Handle EmailLayout
    if (block.type === 'EmailLayout') {
      const data = block.data as { childrenIds?: string[] };
      if (data.childrenIds) {
        data.childrenIds = data.childrenIds.filter((id) => id !== blockId);
      }
    }

    // Handle Container
    if (block.type === 'Container') {
      const data = block.data as { props?: { childrenIds?: string[] } };
      if (data.props?.childrenIds) {
        data.props.childrenIds = data.props.childrenIds.filter((id) => id !== blockId);
      }
    }

    // Handle ColumnsContainer
    if (block.type === 'ColumnsContainer') {
      const data = block.data as { props?: { columns?: Array<{ childrenIds?: string[] }> } };
      if (data.props?.columns) {
        for (const column of data.props.columns) {
          if (column.childrenIds) {
            column.childrenIds = column.childrenIds.filter((id) => id !== blockId);
          }
        }
      }
    }
  }
}

/**
 * Get all descendant block IDs (for cascading delete)
 */
function getDescendantIds(document: TReaderDocument, blockId: string): string[] {
  const block = document[blockId];
  if (!block) return [];

  const descendants: string[] = [];

  // Get children based on block type
  let childrenIds: string[] = [];

  if (block.type === 'Container') {
    const data = block.data as { props?: { childrenIds?: string[] } };
    childrenIds = data.props?.childrenIds ?? [];
  } else if (block.type === 'ColumnsContainer') {
    const data = block.data as { props?: { columns?: Array<{ childrenIds?: string[] }> } };
    if (data.props?.columns) {
      for (const column of data.props.columns) {
        childrenIds.push(...(column.childrenIds ?? []));
      }
    }
  }

  // Recursively get descendants
  for (const childId of childrenIds) {
    descendants.push(childId);
    descendants.push(...getDescendantIds(document, childId));
  }

  return descendants;
}

/**
 * Remove a block from a template (with cascading delete for containers)
 */
export function removeBlock(input: unknown): ToolResponse {
  // Validate input
  const result = RemoveBlockInputSchema.safeParse(input);
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

  const { templateId, blockId } = result.data;

  // Cannot remove root block
  if (blockId === 'root') {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: true,
            code: 'VALIDATION_ERROR',
            message: 'Cannot remove the root block',
          }),
        },
      ],
      isError: true,
    };
  }

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
  if (!template.document[blockId]) {
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
    // Clone document
    const document = { ...template.document };

    // Get all descendants to delete
    const descendantIds = getDescendantIds(document, blockId);

    // Remove block from all parent references
    removeFromAllParents(document, blockId);

    // Delete the block and all descendants
    delete document[blockId];
    for (const descendantId of descendantIds) {
      delete document[descendantId];
    }

    // Update template
    storage.updateTemplate(templateId, document);

    // Render HTML
    const html = renderTemplate(document);

    const removedCount = 1 + descendantIds.length;
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            message: `Removed block ${blockId}${removedCount > 1 ? ` and ${removedCount - 1} child blocks` : ''}`,
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
