import React from 'react';
import { z } from 'zod';

import { BaseZodDictionary, DocumentBlocksDictionary } from '../utils';

export default function buildBlockComponent<T extends BaseZodDictionary>(blocks: DocumentBlocksDictionary<T>) {
  type BaseBlockComponentProps<TType extends keyof T> = {
    type: TType;
    data: z.infer<T[TType]>;
  };

  return function BlockComponent({ type, data }: BaseBlockComponentProps<keyof T>): React.ReactNode {
    return React.createElement(blocks[type].Component, data);
  };
}
