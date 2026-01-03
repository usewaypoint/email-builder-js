import { BlockType, BlockTypeSchema, ToolResponse } from '../types/index.js';
import { BLOCK_DESCRIPTIONS, isContainerType } from '../utils/block-factory.js';

// Property schemas for each block type (simplified for LLM understanding)
const BLOCK_SCHEMAS: Record<BlockType, { props: object; style: object }> = {
  Text: {
    props: {
      text: { type: 'string', description: 'The text content to display' },
      markdown: { type: 'boolean', description: 'Whether to render as markdown' },
    },
    style: {
      color: { type: 'string', description: 'Text color (hex, e.g., #000000)' },
      backgroundColor: { type: 'string', description: 'Background color (hex)' },
      fontSize: { type: 'number', description: 'Font size in pixels' },
      fontFamily: { type: 'string', description: 'Font family (e.g., MODERN_SANS)' },
      fontWeight: { type: 'string', enum: ['bold', 'normal'] },
      textAlign: { type: 'string', enum: ['left', 'center', 'right'] },
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
  Button: {
    props: {
      text: { type: 'string', description: 'Button text' },
      url: { type: 'string', description: 'Button link URL' },
      buttonBackgroundColor: { type: 'string', description: 'Button background color (hex)' },
      buttonTextColor: { type: 'string', description: 'Button text color (hex)' },
      size: { type: 'string', enum: ['x-small', 'small', 'medium', 'large'] },
      buttonStyle: { type: 'string', enum: ['rectangle', 'pill', 'rounded'] },
      fullWidth: { type: 'boolean', description: 'Whether button spans full width' },
    },
    style: {
      backgroundColor: { type: 'string', description: 'Container background color (hex)' },
      textAlign: { type: 'string', enum: ['left', 'center', 'right'] },
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
  Image: {
    props: {
      url: { type: 'string', description: 'Image URL' },
      alt: { type: 'string', description: 'Alt text for accessibility' },
      linkHref: { type: 'string', description: 'Optional link when image is clicked' },
      width: { type: 'number', description: 'Image width in pixels' },
      contentAlignment: { type: 'string', enum: ['left', 'middle', 'right'] },
    },
    style: {
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
  Heading: {
    props: {
      text: { type: 'string', description: 'Heading text' },
      level: { type: 'string', enum: ['h1', 'h2', 'h3'] },
    },
    style: {
      color: { type: 'string', description: 'Text color (hex)' },
      fontSize: { type: 'number', description: 'Font size in pixels' },
      fontWeight: { type: 'string', enum: ['bold', 'normal'] },
      textAlign: { type: 'string', enum: ['left', 'center', 'right'] },
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
  Avatar: {
    props: {
      imageUrl: { type: 'string', description: 'Avatar image URL' },
      alt: { type: 'string', description: 'Alt text for accessibility' },
      size: { type: 'number', description: 'Avatar size in pixels' },
      shape: { type: 'string', enum: ['circle', 'square', 'rounded'] },
    },
    style: {
      textAlign: { type: 'string', enum: ['left', 'center', 'right'] },
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
  Divider: {
    props: {
      lineColor: { type: 'string', description: 'Divider line color (hex)' },
      lineHeight: { type: 'number', description: 'Line thickness in pixels' },
    },
    style: {
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
  Spacer: {
    props: {
      height: { type: 'number', description: 'Spacer height in pixels' },
    },
    style: {},
  },
  Html: {
    props: {
      contents: { type: 'string', description: 'Raw HTML content' },
    },
    style: {
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
  Container: {
    props: {
      childrenIds: { type: 'array', items: 'string', description: 'IDs of child blocks (managed automatically)' },
    },
    style: {
      backgroundColor: { type: 'string', description: 'Container background color (hex)' },
      borderColor: { type: 'string', description: 'Border color (hex)' },
      borderRadius: { type: 'number', description: 'Border radius in pixels' },
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
  ColumnsContainer: {
    props: {
      columnsGap: { type: 'number', description: 'Gap between columns in pixels' },
      contentAlignment: { type: 'string', enum: ['top', 'middle', 'bottom'] },
      columns: { type: 'array', description: 'Array of column definitions (managed automatically)' },
    },
    style: {
      padding: { type: 'object', properties: { top: 'number', bottom: 'number', right: 'number', left: 'number' } },
    },
  },
};

/**
 * List all available block types with their schemas
 */
export function listBlockTypes(): ToolResponse {
  const blockTypes = BlockTypeSchema.options.map((type) => ({
    type,
    description: BLOCK_DESCRIPTIONS[type],
    props: BLOCK_SCHEMAS[type].props,
    style: BLOCK_SCHEMAS[type].style,
    isContainer: isContainerType(type),
  }));

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({ blockTypes }, null, 2),
      },
    ],
  };
}
