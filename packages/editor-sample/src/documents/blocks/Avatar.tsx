import { z } from 'zod';

import { zColor, zPadding, zTextAlign } from './helpers/zod';

export const AvatarPropsSchema = z.object({
  style: z
    .object({
      textAlign: zTextAlign().optional().nullable().default(null),
      padding: zPadding().optional().default({
        top: 16,
        bottom: 16,
        left: 16,
        right: 16,
      }),
    })
    .default({}),
  props: z.object({
    size: z.number().gt(0).default(64),
    shape: z.enum(['circle', 'square', 'rounded']),
    imageUrl: z.string().default(''),
    fallbackText: z.string().optional().default(''),
    fallbackColor: zColor().optional().nullable().default(null),
  }),
});

export type AvatarProps = z.infer<typeof AvatarPropsSchema>;

function getBorderRadius({ shape, size }: AvatarProps['props']): number | undefined {
  switch (shape) {
    case 'rounded':
      return size;
    case 'circle':
      return size;
    case 'square':
    default:
      return undefined;
  }
}

export function Avatar({ props }: AvatarProps) {
  const { size, imageUrl, fallbackText } = props;
  return (
    <img
      alt={fallbackText}
      src={imageUrl}
      height={size}
      width={size}
      style={{
        outline: 'none',
        border: 'none',
        textDecoration: 'none',
        objectFit: 'cover',
        height: size,
        width: size,
        maxWidth: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderRadius: getBorderRadius(props),
      }}
    />
  );
}
