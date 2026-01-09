import { MoveBlockInputSchema, ToolResponse, TReaderDocument } from '../types/index.js';
import * as storage from '../services/template-storage.js';
import { renderTemplate } from '../services/renderer.js';

/**
 * Find the parent of a block and move it in the childrenIds array
 */
function moveInParent(
  document: TReaderDocument,
  blockId: string,
  direction: 'up' | 'down'
): { success: boolean; message?: string } {
  for (const [_parentId, block] of Object.entries(document)) {
    let childrenIds: string[] | undefined;
    let updateFn: (newChildrenIds: string[]) => void;

    // Handle EmailLayout
    if (block.type === 'EmailLayout') {
      const data = block.data as { childrenIds?: string[] };
      childrenIds = data.childrenIds;
      updateFn = (newIds) => {
        data.childrenIds = newIds;
      };
    }
    // Handle Container
    else if (block.type === 'Container') {
      const data = block.data as { props?: { childrenIds?: string[] } };
      childrenIds = data.props?.childrenIds;
      updateFn = (newIds) => {
        if (!data.props) data.props = {};
        data.props.childrenIds = newIds;
      };
    }
    // Handle ColumnsContainer - check each column
    else if (block.type === 'ColumnsContainer') {
      const data = block.data as { props?: { columns?: Array<{ childrenIds?: string[] }> } };
      if (data.props?.columns) {
        for (const column of data.props.columns) {
          if (column.childrenIds?.includes(blockId)) {
            childrenIds = column.childrenIds;
            updateFn = (newIds) => {
              column.childrenIds = newIds;
            };
            break;
          }
        }
      }
    }

    if (!childrenIds) continue;

    const index = childrenIds.indexOf(blockId);
    if (index === -1) continue;

    // Found the parent, now move the block
    const newChildrenIds = [...childrenIds];

    if (direction === 'up') {
      if (index === 0) {
        return { success: false, message: 'Block is already at the top' };
      }
      [newChildrenIds[index], newChildrenIds[index - 1]] = [
        newChildrenIds[index - 1],
        newChildrenIds[index],
      ];
    } else {
      if (index === childrenIds.length - 1) {
        return { success: false, message: 'Block is already at the bottom' };
      }
      [newChildrenIds[index], newChildrenIds[index + 1]] = [
        newChildrenIds[index + 1],
        newChildrenIds[index],
      ];
    }

    updateFn!(newChildrenIds);
    return { success: true };
  }

  return { success: false, message: 'Block not found in any container' };
}

/**
 * Move a block up or down within its parent container
 */
export function moveBlock(input: unknown): ToolResponse {
  // Validate input
  const result = MoveBlockInputSchema.safeParse(input);
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

  const { templateId, blockId, direction } = result.data;

  // Cannot move root block
  if (blockId === 'root') {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: true,
            code: 'VALIDATION_ERROR',
            message: 'Cannot move the root block',
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

    // Move the block
    const moveResult = moveInParent(document, blockId, direction);
    if (!moveResult.success) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: true,
              code: 'VALIDATION_ERROR',
              message: moveResult.message,
            }),
          },
        ],
        isError: true,
      };
    }

    // Update template
    storage.updateTemplate(templateId, document);

    // Render HTML
    const html = renderTemplate(document);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            message: `Moved block ${blockId} ${direction}`,
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
