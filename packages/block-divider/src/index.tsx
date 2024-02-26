import React, { CSSProperties } from 'react';
import { z } from 'zod';

function zColor() {
  return z.string().regex(/^#[0-9a-fA-F]{6}$/);
}

export const DividerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: zColor().optional().nullable(),
      padding: z
        .object({
          top: z.number(),
          bottom: z.number(),
          right: z.number(),
          left: z.number(),
        })
        .optional()
        .nullable(),
    })
    .optional(),
  props: z
    .object({
      lineColor: zColor().optional().nullable(),
      lineHeight: z.number().optional().nullable(),
    })
    .optional(),
});

export type DividerProps = z.infer<typeof DividerPropsSchema>;

export function Divider({ style, props }: DividerProps) {
  const st: CSSProperties = {
    padding: getPadding(style),
    backgroundColor: style?.backgroundColor ?? undefined,
  };
  const borderTopWidth = props?.lineHeight ?? 1;
  const borderTopColor = props?.lineColor ?? '#333333';
  return (
    <div style={st}>
      <hr
        style={{
          width: '100%',
          border: 'none',
          borderTop: `${borderTopWidth}px solid ${borderTopColor}`,
          margin: 0,
        }}
      />
    </div>
  );
}

function getPadding(style: DividerProps['style']) {
  const value = style?.padding;
  if (!value) {
    return undefined;
  }
  return `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px`;
}
