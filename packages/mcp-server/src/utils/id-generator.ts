import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a UUID for template IDs
 */
export function generateTemplateId(): string {
  return uuidv4();
}

/**
 * Generate a timestamp-based block ID
 * Format: block-{timestamp}
 */
export function generateBlockId(): string {
  return `block-${Date.now()}`;
}
