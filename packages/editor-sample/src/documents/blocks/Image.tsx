import { z } from 'zod';

import { zColor, zPadding, zTextAlign } from './helpers/zod';

export const ImagePropsSchema = z.object({
  style: z
    .object({
      padding: zPadding().default({
        top: 24,
        bottom: 24,
        left: 24,
        right: 24,
      }),
      backgroundColor: zColor().nullable().default(null),
      textAlign: zTextAlign().optional().nullable().default(null),
    })
    .default({}),
  props: z.object({
    height: z.number().nullable().default(null),
    width: z.number().nullable().default(null),
    url: z.string(),
    alt: z.string(),
    linkHref: z.union([z.string(), z.null()]).default(null),
    contentAlignment: z.enum(['top', 'middle', 'bottom']),
  }),
});

export type ImageProps = z.infer<typeof ImagePropsSchema>;

export function Image({ props: { height, width, url, alt, contentAlignment } }: ImageProps) {
  return (
    <img
      alt={alt}
      src={url}
      height={height ?? undefined}
      width={width ?? undefined}
      style={{
        outline: 'none',
        border: 'none',
        textDecoration: 'none',
        verticalAlign: contentAlignment,
        display: 'inline-block',
        maxWidth: '100%',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    />
  );
}
