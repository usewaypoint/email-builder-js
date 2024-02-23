import { z } from 'zod';

import { zColor, zFontFamily, zPadding, zTextAlign } from './helpers/zod';

export const HtmlPropsSchema = z.object({
  style: z
    .object({
      color: zColor().nullable().default(null),
      backgroundColor: zColor().nullable().default(null),
      fontFamily: zFontFamily().nullable().default(null),
      fontSize: z.number().min(0).default(16),
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
    contents: z.string(),
  }),
});

export type HtmlProps = z.infer<typeof HtmlPropsSchema>;

export function Html({ props: { contents } }: HtmlProps) {
  const children = contents;
  return <div dangerouslySetInnerHTML={{ __html: children }} />;
}
