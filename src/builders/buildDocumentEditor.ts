import React, { createContext, useContext, useMemo, useState } from 'react';
import { z } from 'zod';

import { BaseZodDictionary, BlockNotFoundError, DocumentBlocksDictionary } from '../utils';

import buildBlockComponent from './buildBlockComponent';
import buildBlockConfigurationByIdSchema from './buildBlockConfigurationByIdSchema';

/**
 * @typedef {Object} DocumentEditor
 * @property DocumentEditorProvider - Entry point to the DocumentEditor
 * @property Block - Component to render a block given an id
 * @property useDocumentState - Hook that returns the current DocumentState and a setter
 * @property useBlockState - Hook that returns the Block value and setter given an id
 */

/**
 * @param {DocumentBlocksDictionary} blocks root configuration
 * @returns {DocumentEditor}
 */
export default function buildDocumentEditor<T extends BaseZodDictionary>(blocks: DocumentBlocksDictionary<T>) {
  const schema = buildBlockConfigurationByIdSchema(blocks);
  const BlockComponent = buildBlockComponent(blocks);

  type TValue = z.infer<typeof schema>;
  type TDocumentContextState = [value: TValue, setValue: (v: TValue) => void];

  const Context = createContext<TDocumentContextState>([{}, () => {}]);

  type TProviderProps = {
    value: z.infer<typeof schema>;
    children?: Parameters<typeof Context.Provider>[0]['children'];
  };

  const useDocumentState = () => useContext(Context);
  const useBlockState = (id: string | null | undefined) => {
    const [value, setValue] = useDocumentState();
    return useMemo(() => {
      if (id === null || id === undefined) {
        return null;
      }
      return [
        value[id],
        (block: TValue[string]) => {
          setValue({ ...value, [id]: block });
        },
      ] as const;
    }, [value, setValue, id]);
  };
  return {
    useDocumentState,
    useBlockState,
    Block: ({ id }: { id: string }) => {
      const state = useBlockState(id);
      if (state === null || !state[0]) {
        throw new BlockNotFoundError(id);
      }
      const { type, data } = state[0];
      return React.createElement(BlockComponent, { type, data });
    },
    DocumentEditorProvider: ({ value, children }: TProviderProps) => {
      const state = useState<TValue>(value);
      return React.createElement(Context.Provider, { value: state, children });
    },
  };
}
