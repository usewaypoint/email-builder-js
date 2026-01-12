import { ToolResponse } from '../types/index.js';
import * as storage from '../services/template-storage.js';

/**
 * List all stored templates
 */
export function listTemplates(): ToolResponse {
  const templates = storage.listTemplates();

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          templates,
          count: templates.length,
        }),
      },
    ],
  };
}
