import { AddBlockInputSchema, ToolResponse, TReaderDocument } from '../types/index.js';
import { createBlock } from '../utils/block-factory.js';
import * as storage from '../services/template-storage.js';
import { renderTemplate } from '../services/renderer.js';

/**
 * Find the parent block and add a child to its childrenIds
 */
function addChildToParent(
  document: TReaderDocument,
  parentBlockId: string,
  childId: string,
  position?: number
): boolean {
  const parent = document[parentBlockId];
  if (!parent) {
    return false;
  }

  // Handle EmailLayout (childrenIds at data level)
  if (parent.type === 'EmailLayout') {
    const data = parent.data as { childrenIds?: string[] };
    const childrenIds = data.childrenIds ?? [];
    if (position !== undefined && position >= 0 && position < childrenIds.length) {
      childrenIds.splice(position, 0, childId);
    } else {
      childrenIds.push(childId);
    }
    data.childrenIds = childrenIds;
    return true;
  }

  // Handle Container (childrenIds in data.props)
  if (parent.type === 'Container') {
    const data = parent.data as { props?: { childrenIds?: string[] } };
    if (!data.props) {
      data.props = { childrenIds: [] };
    }
    const childrenIds = data.props.childrenIds ?? [];
    if (position !== undefined && position >= 0 && position < childrenIds.length) {
      childrenIds.splice(position, 0, childId);
    } else {
      childrenIds.push(childId);
    }
    data.props.childrenIds = childrenIds;
    return true;
  }

  // Handle ColumnsContainer - add to first column by default
  if (parent.type === 'ColumnsContainer') {
    const data = parent.data as { props?: { columns?: Array<{ childrenIds?: string[] }> } };
    if (!data.props) {
      data.props = { columns: [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }] };
    }
    if (!data.props.columns || data.props.columns.length === 0) {
      data.props.columns = [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }];
    }
    const firstColumn = data.props.columns[0];
    const childrenIds = firstColumn.childrenIds ?? [];
    if (position !== undefined && position >= 0 && position < childrenIds.length) {
      childrenIds.splice(position, 0, childId);
    } else {
      childrenIds.push(childId);
    }
    firstColumn.childrenIds = childrenIds;
    return true;
  }

  return false;
}

/**
 * Add a block to a template
 */
export function addBlock(input: unknown): ToolResponse {
  // Validate input
  const result = AddBlockInputSchema.safeParse(input);
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

  const { templateId, blockType, parentBlockId, position, props, style } = result.data;

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
    // Create the new block
    const { id: blockId, block } = createBlock(
      blockType,
      props as Record<string, unknown> | undefined,
      style as Record<string, unknown> | undefined
    );

    // Clone document
    const document = { ...template.document };

    // Add block to document
    document[blockId] = block;

    // Add to parent
    const parentId = parentBlockId ?? 'root';
    if (!addChildToParent(document, parentId, blockId, position)) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: true,
              code: 'BLOCK_NOT_FOUND',
              message: `Parent block with ID ${parentId} not found or is not a container`,
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
            blockId,
            message: `Added ${blockType} block with ID ${blockId}`,
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
