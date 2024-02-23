import { z } from 'zod';

import { zColor, zFontFamily, zFontWeight, zPadding, zTextAlign } from './helpers/zod';

export const HeadingPropsSchema = z.object({
  style: z
    .object({
      color: zColor().optional().nullable().default(null),
      backgroundColor: zColor().optional().nullable().default(null),
      fontFamily: zFontFamily().optional().nullable().default(null),
      fontWeight: zFontWeight().optional().default('bold'),
      textAlign: zTextAlign().optional().nullable().default(null),
      padding: zPadding().optional().default({
        top: 16,
        bottom: 16,
        left: 24,
        right: 24,
      }),
    })
    .default({}),
  props: z.object({
    text: z.string().default('Hello world'),
    level: z.enum(['h1', 'h2', 'h3']).default('h2'),
  }),
});

export type HeadingProps = z.infer<typeof HeadingPropsSchema>;

/* TODO
 * - process liquid
 */
export function Heading({ props: { text, level } }: HeadingProps) {
  switch (level) {
    case 'h1':
      return <h1 style={{ fontWeight: 'inherit', margin: 0, fontSize: '32px' }}>{text}</h1>;
    case 'h2':
      return <h2 style={{ fontWeight: 'inherit', margin: 0, fontSize: '24px' }}>{text}</h2>;
    case 'h3':
      return <h3 style={{ fontWeight: 'inherit', margin: 0, fontSize: '20px' }}>{text}</h3>;
  }
}
