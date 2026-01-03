import { BlockType } from '../types/index.js';
import { generateBlockId } from './id-generator.js';

// Block structure type (simplified for our needs)
interface BlockData {
  type: string;
  data: Record<string, unknown>;
}

// Default values for each block type
const BLOCK_DEFAULTS: Record<BlockType, { style?: object; props?: object }> = {
  Text: {
    style: {
      padding: { top: 16, bottom: 16, right: 24, left: 24 },
    },
    props: {
      text: '',
    },
  },
  Button: {
    style: {
      padding: { top: 16, bottom: 16, right: 24, left: 24 },
      textAlign: 'center',
    },
    props: {
      text: 'Click here',
      url: 'https://example.com',
      buttonBackgroundColor: '#0079cc',
      buttonTextColor: '#FFFFFF',
      size: 'medium',
      buttonStyle: 'rounded',
    },
  },
  Image: {
    style: {
      padding: { top: 16, bottom: 16, right: 24, left: 24 },
    },
    props: {
      url: '',
      alt: '',
      contentAlignment: 'middle',
    },
  },
  Heading: {
    style: {
      padding: { top: 16, bottom: 16, right: 24, left: 24 },
    },
    props: {
      text: 'Heading',
      level: 'h1',
    },
  },
  Avatar: {
    style: {
      padding: { top: 16, bottom: 16, right: 24, left: 24 },
    },
    props: {
      imageUrl: '',
      alt: '',
      size: 64,
      shape: 'circle',
    },
  },
  Divider: {
    style: {
      padding: { top: 16, bottom: 16, right: 24, left: 24 },
    },
    props: {
      lineColor: '#CCCCCC',
      lineHeight: 1,
    },
  },
  Spacer: {
    props: {
      height: 32,
    },
  },
  Html: {
    style: {
      padding: { top: 16, bottom: 16, right: 24, left: 24 },
    },
    props: {
      contents: '',
    },
  },
  Container: {
    style: {
      padding: { top: 16, bottom: 16, right: 16, left: 16 },
    },
    props: {
      childrenIds: [],
    },
  },
  ColumnsContainer: {
    style: {},
    props: {
      columnsGap: 16,
      contentAlignment: 'middle',
      columns: [
        { childrenIds: [] },
        { childrenIds: [] },
        { childrenIds: [] },
      ],
    },
  },
};

// Block type descriptions for the list_block_types tool
export const BLOCK_DESCRIPTIONS: Record<BlockType, string> = {
  Text: 'A text block for displaying paragraphs, labels, or any text content. Supports markdown.',
  Button: 'A clickable button with customizable text, URL, colors, and styles.',
  Image: 'An image block for displaying pictures with alt text and optional link.',
  Heading: 'A heading block (h1-h6) for titles and section headers.',
  Avatar: 'A circular or square avatar image, typically used for profile pictures.',
  Divider: 'A horizontal line divider to separate content sections.',
  Spacer: 'An empty space block to add vertical spacing between elements.',
  Html: 'A raw HTML block for custom HTML content.',
  Container: 'A container block that can hold other blocks. Useful for grouping and styling.',
  ColumnsContainer: 'A multi-column layout block with 2-3 responsive columns.',
};

// Container block types
export const CONTAINER_TYPES: BlockType[] = ['Container', 'ColumnsContainer'];

/**
 * Check if a block type is a container (can have children)
 */
export function isContainerType(blockType: BlockType): boolean {
  return CONTAINER_TYPES.includes(blockType);
}

/**
 * Create a new block with default values
 */
export function createBlock(
  blockType: BlockType,
  customProps?: Record<string, unknown>,
  customStyle?: Record<string, unknown>
): { id: string; block: BlockData } {
  const defaults = BLOCK_DEFAULTS[blockType];
  const id = generateBlockId();

  const block: BlockData = {
    type: blockType,
    data: {
      style: {
        ...defaults.style,
        ...customStyle,
      },
      props: {
        ...defaults.props,
        ...customProps,
      },
    },
  };

  return { id, block };
}

/**
 * Create the root EmailLayout block
 */
export function createEmailLayout(options: {
  backdropColor?: string;
  canvasColor?: string;
  textColor?: string;
  fontFamily?: string;
}): BlockData {
  return {
    type: 'EmailLayout',
    data: {
      backdropColor: options.backdropColor ?? '#F2F5F7',
      canvasColor: options.canvasColor ?? '#FFFFFF',
      textColor: options.textColor ?? '#242424',
      fontFamily: options.fontFamily ?? 'MODERN_SANS',
      childrenIds: [],
    },
  };
}

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        sourceValue !== null &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue !== null &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}
