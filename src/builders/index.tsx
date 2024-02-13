import React from 'react';
import { z } from 'zod';

export type DocumentBlocksDictionary<T extends { [name: string]: z.AnyZodObject }> = {
  [K in keyof T]: {
    schema: T[K];
    Component: (props: z.infer<T[K]>) => React.ReactNode;
  };
};

export function buildBlockConfigurationSchema<T extends { [name: string]: z.AnyZodObject }>(
  blocks: DocumentBlocksDictionary<T>
) {
  type BaseBlockComponentProps<TType extends keyof T> = {
    id: string;
    type: TType;
    data: z.infer<T[TType]>;
  };

  const blockObjects = Object.keys(blocks).map((type: keyof T) =>
    z.object({
      id: z.string(),
      type: z.literal(type),
      data: blocks[type].schema,
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return z.discriminatedUnion('type', blockObjects as any).transform((v) => v as BaseBlockComponentProps<keyof T>);
}

export function buildBlockComponent<T extends { [name: string]: z.AnyZodObject }>(blocks: DocumentBlocksDictionary<T>) {
  type BaseBlockComponentProps<TType extends keyof T> = {
    type: TType;
    data: z.infer<T[TType]>;
  };

  return function BlockComponent({ type, data }: BaseBlockComponentProps<keyof T>): React.ReactNode {
    return React.createElement(blocks[type].Component, data);
  };
}
