import { BaseZodDictionary, DocumentBlocksDictionary } from '../utils';

/**
 * Identity function to type a DocumentBlocksDictionary
 * @param blocks Main DocumentBlocksDictionary
 * @returns typed DocumentBlocksDictionary
 */
export default function buildBlockConfigurationDictionary<T extends BaseZodDictionary>(
  blocks: DocumentBlocksDictionary<T>
) {
  return blocks;
}
