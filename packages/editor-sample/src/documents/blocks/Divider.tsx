import React from 'react';
import { z } from 'zod';

import { zColor, zPadding } from './helpers/zod';

export const DividerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: zColor().optional().nullable().default(null),
      padding: zPadding().optional().default({
        top: 16,
        bottom: 16,
        left: 0,
        right: 0,
      }),
    })
    .default({}),
  props: z
    .object({
      lineColor: zColor().default('#333333'),
      lineHeight: z.number().default(1),
    })
    .default({}),
});

export type DividerProps = z.infer<typeof DividerPropsSchema>;

export function Divider({ props: { lineColor, lineHeight } }: DividerProps) {
  return (
    <hr
      style={{
        width: '100%',
        border: 'none',
        borderTop: '1px solid #eaeaea',
        borderColor: lineColor,
        borderTopWidth: lineHeight,
      }}
    />
  );
}
