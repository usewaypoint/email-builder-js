import React, { CSSProperties } from 'react';
import { z } from 'zod';

import { zColor, zFontFamily, zFontWeight, zPadding, zTextAlign } from './helpers/zod';

export const ButtonPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: zColor().nullable().default(null),
      fontSize: z.number().min(0).default(16),
      fontFamily: zFontFamily().nullable().default(null),
      fontWeight: zFontWeight().nullable().default('bold'),
      textAlign: zTextAlign().optional().nullable().default('center'),
      padding: zPadding().optional().default({
        top: 16,
        bottom: 16,
        left: 24,
        right: 24,
      }),
    })
    .default({}),
  props: z.object({
    buttonBackgroundColor: zColor().default('#999999'),
    buttonStyle: z.enum(['rectangle', 'pill', 'rounded']).default('rounded'),
    buttonTextColor: zColor().default('#FFFFFF'),
    fullWidth: z.boolean().default(false),
    size: z.enum(['x-small', 'small', 'large', 'medium']).default('medium'),
    text: z.string(),
    url: z.string(),
  }),
});

export type ButtonProps = z.infer<typeof ButtonPropsSchema>;

function getRoundedCorners(props: ButtonProps['props']) {
  switch (props.buttonStyle) {
    case 'rectangle':
      return undefined;
    case 'pill':
      return 64;
    case 'rounded':
    default:
      return 4;
  }
}

function getButtonSizePadding(props: ButtonProps['props']) {
  switch (props.size) {
    case 'x-small':
      return [4, 8] as const;
    case 'small':
      return [8, 12] as const;
    case 'large':
      return [16, 32] as const;
    case 'medium':
    default:
      return [12, 20] as const;
  }
}

export function Button({ props }: ButtonProps) {
  const href = props.url;
  const padding = getButtonSizePadding(props);
  const textColor = props.buttonTextColor;
  const textRaise = (padding[1] * 2 * 3) / 4;
  const style: CSSProperties = {
    color: textColor,
    backgroundColor: props.buttonBackgroundColor,
    borderRadius: getRoundedCorners(props),
    display: 'inline-block',
    padding: `${padding[0]}px ${padding[1]}px`,
    textDecoration: 'none',
  };

  return (
    <a href={href} style={style} target="_blank">
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]><i style="letter-spacing: ${padding[1]}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`,
        }}
      />
      <span>{props.text}</span>
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]><i style="letter-spacing: ${padding[1]}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`,
        }}
      />
    </a>
  );
}
