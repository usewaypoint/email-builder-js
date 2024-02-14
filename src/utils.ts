import React from 'react';
import { z } from 'zod';

export type BaseZodDictionary = { [name: string]: z.AnyZodObject };
export type DocumentBlocksDictionary<T extends BaseZodDictionary> = {
  [K in keyof T]: {
    schema: T[K];
    Component: (props: z.infer<T[K]>) => React.ReactNode;
  };
};

export class BlockNotFoundError extends Error {
  blockId: string;
  constructor(blockId: string) {
    super('Could not find a block with the given blockId');
    this.blockId = blockId;
  }
}
