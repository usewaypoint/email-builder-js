import { z } from 'zod';

import { BaseZodDictionary, DocumentBlocksDictionary } from '../utils';

import buildBlockConfigurationSchema from './buildBlockConfigurationSchema';

/**
 * @param blocks Main DocumentBlocksDictionary
 * @returns zod schema that can parse arbitrary objects into { [id]: BlockConfiguration } pairs
 */
export default function buildBlockConfigurationByIdSchema<T extends BaseZodDictionary>(
  blocks: DocumentBlocksDictionary<T>
) {
  const schema = buildBlockConfigurationSchema(blocks);
  return z.record(z.string(), schema);
}
