import { z } from 'zod';

import { zColor, zPadding } from '../helpers/zod';

const ColumnsContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: zColor().nullable().default(null),
      padding: zPadding().optional().default({
        top: 16,
        bottom: 16,
        left: 24,
        right: 24,
      }),
    })
    .default({}),
  props: z.object({
    columnsCount: z.union([z.literal(2), z.literal(3)]),
    columns: z.tuple([
      z.object({ childrenIds: z.array(z.string()) }),
      z.object({ childrenIds: z.array(z.string()) }),
      z.object({ childrenIds: z.array(z.string()) }),
    ]),
  }),
});

export type ColumnsContainerProps = z.infer<typeof ColumnsContainerPropsSchema>;
export default ColumnsContainerPropsSchema;
