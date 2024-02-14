import { z } from 'zod';

import { BaseZodDictionary, DocumentBlocksDictionary } from '../utils';

export default function buildBlockConfigurationSchema<T extends BaseZodDictionary>(
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
