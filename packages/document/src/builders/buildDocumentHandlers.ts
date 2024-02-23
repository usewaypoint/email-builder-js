import { BaseZodDictionary, DocumentBlocksDictionary } from '../utils';

import buildBlockComponent from './buildBlockComponent';
import buildBlockConfigurationSchema from './buildBlockConfigurationSchema';

/**
 * @typedef {Object} DocumentHandlers
 * @property Schema - zod schema for a Document block
 * @property Block - React component that can render a BlockConfiguration that is compatible with blocks
 */

/**
 * Shorthand function to create a Block and Schema in a single call
 *
 * @param blocks Main DocumentBlocksDictionary
 * @returns {DocumentHandlers}
 */
export default function buildDocumentHandlers<T extends BaseZodDictionary>(blocks: DocumentBlocksDictionary<T>) {
  return {
    Block: buildBlockComponent(blocks),
    Schema: buildBlockConfigurationSchema(blocks),
  };
}
