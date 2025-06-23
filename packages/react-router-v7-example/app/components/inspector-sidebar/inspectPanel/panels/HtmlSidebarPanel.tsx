import { useState } from 'react';

import { type HtmlProps, HtmlPropsSchema } from '@usewaypoint/block-html';

import { PanelWrapper } from './helpers/panelWrapper';
import { StyleInput } from './helpers/styleInput';
import { TextareaInput } from './helpers/textInput';

type HtmlSidebarPanelProps = {
  data: HtmlProps;
  setData: (v: HtmlProps) => void;
};
export default function HtmlSidebarPanel({ data, setData }: HtmlSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = HtmlPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <PanelWrapper title="Html">
      <TextareaInput
        label="Content"
        rows={5}
        defaultValue={data.props?.contents ?? ''}
        onChange={(contents) => updateData({ ...data, props: { ...data.props, contents } })}
      />

      <StyleInput
        select={[
          { style: 'color', label: 'Color' },
          { style: 'backgroundColor', label: 'Background Color' },
          { style: 'fontFamily', label: 'Font Family' },
          { style: 'fontSize', label: 'Font Size' },
          { style: 'textAlign', label: 'Alignment' },
          { style: 'padding', label: 'Padding' },
        ]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </PanelWrapper>
  );
}
