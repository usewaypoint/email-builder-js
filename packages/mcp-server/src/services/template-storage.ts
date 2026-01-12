import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { TReaderDocument, StoredTemplate, TemplateMetadata } from '../types/index.js';

// Storage directory for templates
const STORAGE_DIR = path.join(os.homedir(), '.email-builder-mcp', 'templates');

// In-memory cache for templates
const templateCache: Map<string, StoredTemplate> = new Map();

/**
 * Initialize the storage directory
 */
export function initStorage(): void {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
    console.error(`[MCP] Created storage directory: ${STORAGE_DIR}`);
  }
}

/**
 * Load all templates from disk into memory cache
 */
export function loadTemplates(): void {
  initStorage();

  const files = fs.readdirSync(STORAGE_DIR);
  for (const file of files) {
    if (file.endsWith('.json')) {
      try {
        const filePath = path.join(STORAGE_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const template = JSON.parse(content) as StoredTemplate;
        templateCache.set(template.metadata.id, template);
      } catch (error) {
        console.error(`[MCP] Failed to load template ${file}:`, error);
      }
    }
  }

  console.error(`[MCP] Loaded ${templateCache.size} templates from storage`);
}

/**
 * Save a template to disk
 */
function saveTemplateToDisk(template: StoredTemplate): void {
  const filePath = path.join(STORAGE_DIR, `${template.metadata.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(template, null, 2), 'utf-8');
}

/**
 * Delete a template file from disk
 */
function deleteTemplateFromDisk(templateId: string): void {
  const filePath = path.join(STORAGE_DIR, `${templateId}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

/**
 * Create a new template
 */
export function createTemplate(
  id: string,
  name: string,
  document: TReaderDocument
): StoredTemplate {
  const now = new Date().toISOString();
  const template: StoredTemplate = {
    metadata: {
      id,
      name,
      createdAt: now,
      updatedAt: now,
    },
    document,
  };

  templateCache.set(id, template);
  saveTemplateToDisk(template);

  console.error(`[MCP] Created template: ${id} (${name})`);
  return template;
}

/**
 * Get a template by ID
 */
export function getTemplate(templateId: string): StoredTemplate | null {
  return templateCache.get(templateId) ?? null;
}

/**
 * Update a template's document
 */
export function updateTemplate(
  templateId: string,
  document: TReaderDocument
): StoredTemplate | null {
  const existing = templateCache.get(templateId);
  if (!existing) {
    return null;
  }

  const updated: StoredTemplate = {
    ...existing,
    metadata: {
      ...existing.metadata,
      updatedAt: new Date().toISOString(),
    },
    document,
  };

  templateCache.set(templateId, updated);
  saveTemplateToDisk(updated);

  console.error(`[MCP] Updated template: ${templateId}`);
  return updated;
}

/**
 * Delete a template
 */
export function deleteTemplate(templateId: string): boolean {
  const existing = templateCache.get(templateId);
  if (!existing) {
    return false;
  }

  templateCache.delete(templateId);
  deleteTemplateFromDisk(templateId);

  console.error(`[MCP] Deleted template: ${templateId}`);
  return true;
}

/**
 * List all templates (metadata only)
 */
export function listTemplates(): TemplateMetadata[] {
  return Array.from(templateCache.values()).map((t) => t.metadata);
}

/**
 * Check if a template exists
 */
export function templateExists(templateId: string): boolean {
  return templateCache.has(templateId);
}
