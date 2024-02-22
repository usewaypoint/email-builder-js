import React, { createContext, useContext } from 'react';
import { z } from 'zod';

import { BaseZodDictionary, BlockNotFoundError, DocumentBlocksDictionary } from '../utils';

import buildBlockComponent from './buildBlockComponent';
import buildBlockConfigurationSchema from './buildBlockConfigurationSchema';

/**
 * @typedef {Object} DocumentReader
 * @property DocumentProvider - Entry point to the DocumentReader
 * @property BlockSchema - zod schema for a Document block
 * @property DocumentSchema - zod schema compatible with the value that DocumentReaderProvider expects
 * @property Block - React Component to render a block by type/data as defined by the DocumentSchema
 * @property useDocument - Hook that returns the current Document
 */

/**
 * @param {DocumentBlocksDictionary} blocks root configuration
 * @returns {DocumentReader}
 */
export default function buildDocumentReader<T extends BaseZodDictionary>(blocks: DocumentBlocksDictionary<T>) {
  const RawBlock = buildBlockComponent(blocks);

  const BlockSchema = buildBlockConfigurationSchema(blocks);
  const DocumentSchema = z.record(z.string(), BlockSchema);

  type TBlock = z.infer<typeof BlockSchema>;
  type TDocument = Record<string, TBlock>;

  const Context = createContext<TDocument>({});
  const useDocument = () => useContext(Context);

  return {
    BlockSchema,
    DocumentSchema,
    RawBlock,
    useDocument,
    DocumentProvider: Context.Provider,
    Block: ({ id }: { id: string }) => {
      const block = useDocument()[id];
      if (!block) {
        throw new BlockNotFoundError(id);
      }
      return React.createElement(RawBlock, block);
    },
  };
}
