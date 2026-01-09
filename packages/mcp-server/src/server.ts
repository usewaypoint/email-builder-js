import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import * as storage from './services/template-storage.js';
import {
  listBlockTypes,
  createTemplate,
  addBlock,
  removeBlock,
  updateBlock,
  moveBlock,
  getTemplate,
  listTemplates,
  deleteTemplate,
} from './tools/index.js';
import {
  getTemplatePreview,
} from './resources/index.js';
import {
  BlockTypeSchema,
  FontFamilySchema,
} from './types/index.js';

// Create the MCP server
export const server = new McpServer({
  name: 'email-builder',
  version: '0.0.1',
});

// Initialize storage on startup
storage.initStorage();
storage.loadTemplates();

// Register tools using the registerTool method
server.tool(
  'list_block_types',
  'List all available block types with their property schemas. Use this to discover what blocks you can add to an email template.',
  {},
  async () => listBlockTypes()
);

server.tool(
  'create_template',
  'Create a new empty email template. Returns the template ID and rendered HTML.',
  {
    name: z.string().optional().describe('Optional name for the template'),
    backdropColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().describe('Background color behind the email (hex, e.g., #F2F5F7)'),
    canvasColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().describe('Email canvas background color (hex, e.g., #FFFFFF)'),
    textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().describe('Default text color (hex, e.g., #242424)'),
    fontFamily: FontFamilySchema.optional().describe('Default font family'),
  },
  async (args) => createTemplate(args)
);

server.tool(
  'add_block',
  'Add a new block to a template. Returns the block ID and updated rendered HTML.',
  {
    templateId: z.string().uuid().describe('The template ID'),
    blockType: BlockTypeSchema.describe('Type of block to add'),
    parentBlockId: z.string().optional().describe('ID of the parent container (default: root)'),
    position: z.number().int().min(0).optional().describe('Position in parent children (default: append)'),
    props: z.record(z.unknown()).optional().describe('Block-specific properties'),
    style: z.record(z.unknown()).optional().describe('Block styling properties'),
  },
  async (args) => addBlock(args)
);

server.tool(
  'remove_block',
  'Remove a block from a template. Also removes any child blocks. Returns updated rendered HTML.',
  {
    templateId: z.string().uuid().describe('The template ID'),
    blockId: z.string().describe('ID of the block to remove'),
  },
  async (args) => removeBlock(args)
);

server.tool(
  'update_block',
  'Update a block\'s properties or styling. Properties are merged with existing values. Returns updated rendered HTML.',
  {
    templateId: z.string().uuid().describe('The template ID'),
    blockId: z.string().describe('ID of the block to update'),
    props: z.record(z.unknown()).optional().describe('Properties to update (merged with existing)'),
    style: z.record(z.unknown()).optional().describe('Style to update (merged with existing)'),
  },
  async (args) => updateBlock(args)
);

server.tool(
  'move_block',
  'Move a block up or down within its parent container. Returns updated rendered HTML.',
  {
    templateId: z.string().uuid().describe('The template ID'),
    blockId: z.string().describe('ID of the block to move'),
    direction: z.enum(['up', 'down']).describe('Direction to move the block'),
  },
  async (args) => moveBlock(args)
);

server.tool(
  'get_template',
  'Get the full JSON template for export. Returns the complete template document and HTML.',
  {
    templateId: z.string().uuid().describe('The template ID'),
  },
  async (args) => getTemplate(args)
);

server.tool(
  'list_templates',
  'List all stored templates with their metadata.',
  {},
  async () => listTemplates()
);

server.tool(
  'delete_template',
  'Delete a stored template.',
  {
    templateId: z.string().uuid().describe('The template ID to delete'),
  },
  async (args) => deleteTemplate(args)
);

// Register resources
server.resource(
  'template-previews',
  'template://*/preview',
  {
    description: 'HTML previews of email templates',
    mimeType: 'text/html',
  },
  async (uri) => {
    const preview = getTemplatePreview(uri.href);
    if (!preview) {
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/plain',
            text: 'Template not found',
          },
        ],
      };
    }
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: preview.mimeType,
          text: preview.content,
        },
      ],
    };
  }
);

console.error('[MCP] Email Builder MCP Server initialized');
