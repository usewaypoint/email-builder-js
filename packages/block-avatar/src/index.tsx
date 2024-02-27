import React, { CSSProperties } from 'react';
import { z } from 'zod';

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export const AvatarPropsSchema = z.object({
  style: z
    .object({
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      size: z.number().gt(0).optional().nullable(),
      shape: z.enum(['circle', 'square', 'rounded']).optional().nullable(),
      imageUrl: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type AvatarProps = z.infer<typeof AvatarPropsSchema>;

function getBorderRadius(shape: 'circle' | 'square' | 'rounded', size: number): number | undefined {
  switch (shape) {
    case 'rounded':
      return size * 0.125;
    case 'circle':
      return size;
    case 'square':
    default:
      return undefined;
  }
}

export const AvatarPropsDefaults = {
  size: 64,
  imageUrl: '',
  alt: '',
  shape: 'square',
} as const;

export function Avatar({ style, props }: AvatarProps) {
  const size = props?.size ?? AvatarPropsDefaults.size;
  const imageUrl = props?.imageUrl ?? AvatarPropsDefaults.imageUrl;
  const alt = props?.alt ?? AvatarPropsDefaults.alt;
  const shape = props?.shape ?? AvatarPropsDefaults.shape;

  const sectionStyle: CSSProperties = {
    textAlign: style?.textAlign ?? undefined,
    padding: getPadding(style?.padding),
  };
  return (
    <div style={sectionStyle}>
      <img
        alt={alt}
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
          borderRadius: getBorderRadius(shape, size),
        }}
      />
    </div>
  );
}
