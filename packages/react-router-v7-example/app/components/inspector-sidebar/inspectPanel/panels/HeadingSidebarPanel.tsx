import { useState } from 'react';

import { type HeadingProps, HeadingPropsDefaults, HeadingPropsSchema } from '@usewaypoint/block-heading';

import { PanelWrapper } from './helpers/panelWrapper';
import { StyleInput } from './helpers/styleInput';
import { TextareaInput } from './helpers/textInput';
import { ToggleGroupInput } from './helpers/toggleGroupInput';

type HeadingSidebarPanelProps = {
  data: HeadingProps;
  setData: (v: HeadingProps) => void;
};
export default function HeadingSidebarPanel({ data, setData }: HeadingSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = HeadingPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <PanelWrapper title="Heading">
      <TextareaInput
        label="Content"
        rows={3}
        defaultValue={data.props?.text ?? HeadingPropsDefaults.text}
        onChange={(text) => {
          updateData({ ...data, props: { ...data.props, text } });
        }}
      />

      <ToggleGroupInput
        label="Level"
        options={[
          {
            label: 'H1',
            value: 'h1',
          },
          {
            label: 'H2',
            value: 'h2',
          },
          {
            label: 'H3',
            value: 'h3',
          },
        ]}
        type="single"
        value={data.props?.level ?? HeadingPropsDefaults.level}
        onValueChange={(level) => {
          updateData({ ...data, props: { ...data.props, level } });
        }}
      />

      <StyleInput
        select={[
          { style: 'color', label: 'Color' },
          { style: 'backgroundColor', label: 'Background Color' },
          { style: 'fontFamily', label: 'Font Family' },
          { style: 'fontWeight', label: 'Font Weight' },
          { style: 'textAlign', label: 'Alignment' },
          { style: 'padding', label: 'Padding' },
        ]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </PanelWrapper>
  );
}
