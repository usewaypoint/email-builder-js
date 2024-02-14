import { z } from 'zod';

import { BaseZodDictionary, DocumentBlocksDictionary } from '../utils';

import buildBlockConfigurationSchema from './buildBlockConfigurationSchema';

export default function buildBlockConfigurationByIdSchema<T extends BaseZodDictionary>(
  blocks: DocumentBlocksDictionary<T>
) {
  const schema = buildBlockConfigurationSchema(blocks);
  return z.record(z.string(), schema);
}
