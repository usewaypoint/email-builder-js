import React from 'react';
import { z } from 'zod';

import { zColor, zFontFamily, zFontWeight, zPadding, zTextAlign } from './helpers/zod';

export const TextPropsSchema = z.object({
  style: z
    .object({
      color: zColor().nullable().default(null),
      backgroundColor: zColor().nullable().default(null),
      fontSize: z.number().min(0).default(16),
      fontFamily: zFontFamily().nullable().default(null),
      fontWeight: zFontWeight().nullable().default('normal'),
      textAlign: zTextAlign().optional().nullable().default(null),
      padding: zPadding().optional().default({
        top: 16,
        bottom: 16,
        left: 24,
        right: 24,
      }),
    })
    .default({}),
  props: z
    .object({
      text: z.string().default(''),
    })
    .default({}),
});

export type TextProps = z.infer<typeof TextPropsSchema>;

/* TODO
 * - process liquid
 * - process markdown
 */
export function Text({ props: { text } }: TextProps) {
  return <div>{text}</div>;
}
