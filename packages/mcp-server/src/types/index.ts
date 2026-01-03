import { z } from 'zod';

// Simple document type for our internal use
// (We use Record<string, unknown> to avoid strict typing issues)
export type TReaderDocument = Record<string, { type: string; data: Record<string, unknown> }>;

// Block type enum for validation
export const BlockTypeSchema = z.enum([
  'Text',
  'Button',
  'Image',
  'Heading',
  'Avatar',
  'Divider',
  'Spacer',
  'Html',
  'Container',
  'ColumnsContainer',
]);

export type BlockType = z.infer<typeof BlockTypeSchema>;

// Font family options
export const FontFamilySchema = z.enum([
  'MODERN_SANS',
  'BOOK_SANS',
  'ORGANIC_SANS',
  'GEOMETRIC_SANS',
  'HEAVY_SANS',
  'ROUNDED_SANS',
  'MODERN_SERIF',
  'BOOK_SERIF',
  'MONOSPACE',
]);

export type FontFamily = z.infer<typeof FontFamilySchema>;

// Template metadata stored alongside the template
export interface TemplateMetadata {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Stored template structure
export interface StoredTemplate {
  metadata: TemplateMetadata;
  document: TReaderDocument;
}

// Tool input schemas
export const CreateTemplateInputSchema = z.object({
  name: z.string().optional(),
  backdropColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  canvasColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  fontFamily: FontFamilySchema.optional(),
});

export type CreateTemplateInput = z.infer<typeof CreateTemplateInputSchema>;

export const AddBlockInputSchema = z.object({
  templateId: z.string().uuid(),
  blockType: BlockTypeSchema,
  parentBlockId: z.string().optional(),
  position: z.number().int().min(0).optional(),
  props: z.record(z.unknown()).optional(),
  style: z.record(z.unknown()).optional(),
});

export type AddBlockInput = z.infer<typeof AddBlockInputSchema>;

export const RemoveBlockInputSchema = z.object({
  templateId: z.string().uuid(),
  blockId: z.string(),
});

export type RemoveBlockInput = z.infer<typeof RemoveBlockInputSchema>;

export const UpdateBlockInputSchema = z.object({
  templateId: z.string().uuid(),
  blockId: z.string(),
  props: z.record(z.unknown()).optional(),
  style: z.record(z.unknown()).optional(),
});

export type UpdateBlockInput = z.infer<typeof UpdateBlockInputSchema>;

export const MoveBlockInputSchema = z.object({
  templateId: z.string().uuid(),
  blockId: z.string(),
  direction: z.enum(['up', 'down']),
});

export type MoveBlockInput = z.infer<typeof MoveBlockInputSchema>;

export const GetTemplateInputSchema = z.object({
  templateId: z.string().uuid(),
});

export type GetTemplateInput = z.infer<typeof GetTemplateInputSchema>;

export const DeleteTemplateInputSchema = z.object({
  templateId: z.string().uuid(),
});

export type DeleteTemplateInput = z.infer<typeof DeleteTemplateInputSchema>;

// Error codes
export type ErrorCode =
  | 'TEMPLATE_NOT_FOUND'
  | 'BLOCK_NOT_FOUND'
  | 'INVALID_BLOCK_TYPE'
  | 'VALIDATION_ERROR'
  | 'STORAGE_ERROR'
  | 'RENDER_ERROR';

// Tool response type compatible with MCP SDK
export interface ToolResponse {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
  [key: string]: unknown;
}
