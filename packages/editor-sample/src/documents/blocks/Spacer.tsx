import React from 'react';
import { z } from 'zod';

export const SpacerPropsSchema = z.object({
  style: z.object({}).default({}),
  props: z
    .object({
      height: z.number().default(16),
    })
    .default({}),
});

export type SpacerProps = z.infer<typeof SpacerPropsSchema>;

export function Spacer({ props: { height } }: SpacerProps) {
  return <div style={{ height: `${height}px` }} />;
}
