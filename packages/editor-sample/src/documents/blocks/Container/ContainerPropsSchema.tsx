import { z } from 'zod';

import { zColor, zPadding } from '../helpers/zod';

export const ContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: zColor().nullable().default(null),
      borderColor: zColor().optional().nullable().default(null),
      borderRadius: z.number().optional().nullable().default(0),
      padding: zPadding().optional().default({
        top: 16,
        bottom: 16,
        left: 24,
        right: 24,
      }),
    })
    .default({}),
  props: z.object({
    childrenIds: z.array(z.string()),
  }),
});
