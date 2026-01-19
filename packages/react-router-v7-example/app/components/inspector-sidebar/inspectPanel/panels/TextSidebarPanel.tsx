import { useState } from 'react';

import { type TextProps, TextPropsSchema } from '@usewaypoint/block-text';

import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import { PanelWrapper } from './helpers/panelWrapper';
import { StyleInput } from './helpers/styleInput';
import { TextareaInput } from './helpers/textInput';
import { BooleanInput } from './helpers/booleanInput';

type TextSidebarPanelProps = {
  data: TextProps;
  setData: (v: TextProps) => void;
};
export default function TextSidebarPanel({ data, setData }: TextSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = TextPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <PanelWrapper title="Text">
      <TextareaInput
        label="Content"
        rows={5}
        defaultValue={data.props?.text ?? ''}
        onChange={(text) => updateData({ ...data, props: { ...data.props, text } })}
      />

      <BooleanInput
        label="Markdown"
        value={data.props?.markdown ?? false}
        onChange={(markdown) => {
          updateData({ ...data, props: { ...data.props, markdown } });
        }}
      />

      <StyleInput
        select={[
          { style: 'color', label: 'Color' },
          { style: 'backgroundColor', label: 'Background Color' },
          { style: 'fontFamily', label: 'Font Family' },
          { style: 'fontSize', label: 'Font Size' },
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
