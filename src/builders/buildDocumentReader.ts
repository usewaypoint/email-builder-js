import React, { createContext, useContext, useMemo } from 'react';
import { z } from 'zod';

import { BaseZodDictionary, BlockNotFoundError, DocumentBlocksDictionary } from '../utils';

import buildBlockComponent from './buildBlockComponent';
import buildBlockConfigurationByIdSchema from './buildBlockConfigurationByIdSchema';

/**
 * @typedef {Object} DocumentReader
 * @property DocumentReaderProvider - Entry point to the DocumentReader
 * @property DocumentConfigurationSchema - zod schema compatible with the value that DocumentReaderProvider expects
 * @property Block - Component to render a block given an id
 * @property useDocument - Hook that returns the current Document
 * @property useBlock - Hook that returns the block given an id
 */

/**
 * @param {DocumentBlocksDictionary} blocks root configuration
 * @returns {DocumentReader}
 */
export default function buildDocumentReader<T extends BaseZodDictionary>(blocks: DocumentBlocksDictionary<T>) {
  const schema = buildBlockConfigurationByIdSchema(blocks);
  const BlockComponent = buildBlockComponent(blocks);

  type TValue = z.infer<typeof schema>;
  type TDocumentContextState = { value: TValue };

  const Context = createContext<TDocumentContextState>({ value: {} });

  type TProviderProps = {
    value: z.infer<typeof schema>;
    children?: Parameters<typeof Context.Provider>[0]['children'];
  };

  const useDocument = () => useContext(Context).value;
  const useBlock = (id: string) => useDocument()[id];

  return {
    useDocument,
    useBlock,
    DocumentConfigurationSchema: schema,
    Block: ({ id }: { id: string }) => {
      const block = useBlock(id);
      if (!block) {
        throw new BlockNotFoundError(id);
      }
      const { type, data } = block;
      return React.createElement(BlockComponent, { type, data });
    },
    DocumentReaderProvider: ({ value, children }: TProviderProps) => {
      const v = useMemo(() => ({ value }), [value]);
      return React.createElement(Context.Provider, { value: v, children });
    },
  };
}
