import React, { createContext, useContext, useMemo, useState } from 'react';
import { z } from 'zod';

import { BaseZodDictionary, BlockNotFoundError, DocumentBlocksDictionary } from '../utils';

import buildBlockComponent from './buildBlockComponent';
import buildBlockConfigurationByIdSchema from './buildBlockConfigurationByIdSchema';

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
  const useBlockState = (id: string) => {
    const [value, setValue] = useDocumentState();
    return useMemo(
      () =>
        [
          value[id],
          (block: TValue[string]) => {
            setValue({ ...value, [id]: block });
          },
        ] as const,
      [value, setValue, id]
    );
  };
  return {
    useDocumentState,
    useBlockState,
    Block: ({ id }: { id: string }) => {
      const [block] = useBlockState(id);
      if (!block) {
        throw new BlockNotFoundError(id);
      }
      const { type, data } = block;
      return React.createElement(BlockComponent, { type, data });
    },
    DocumentEditorProvider: ({ value, children }: TProviderProps) => {
      const state = useState<TValue>(value);
      return React.createElement(Context.Provider, { value: state, children });
    },
  };
}
