import React, { CSSProperties } from 'react';
import { z } from 'zod';

export const SpacerPropsSchema = z.object({
  props: z
    .object({
      height: z.number().optional().nullish(),
    })
    .default({}),
});

export type SpacerProps = z.infer<typeof SpacerPropsSchema>;

export function Spacer({ props: { height } }: SpacerProps) {
  const style: CSSProperties = {
    height: getHeight(height),
  };
  return <div style={style} />;
}

function getHeight(height: number | null | undefined) {
  if (typeof height !== 'number') {
    return 16;
  }
  return height >= 0 ? height : 16;
}
