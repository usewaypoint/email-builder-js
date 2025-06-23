import { useState } from 'react';

import { type DividerProps, DividerPropsDefaults, DividerPropsSchema } from '@usewaypoint/block-divider';

import { ColorInput } from './helpers/colorInput';
import { PanelWrapper } from './helpers/panelWrapper';
import { SliderInput } from './helpers/sliderInput';
import { StyleInput } from './helpers/styleInput';

type DividerSidebarPanelProps = {
  data: DividerProps;
  setData: (v: DividerProps) => void;
};
export default function DividerSidebarPanel({ data, setData }: DividerSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const updateData = (d: unknown) => {
    const res = DividerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const lineColor = data.props?.lineColor ?? DividerPropsDefaults.lineColor;
  const lineHeight = data.props?.lineHeight ?? DividerPropsDefaults.lineHeight;

  return (
    <PanelWrapper title="Divider">
      <ColorInput
        label="Color"
        value={lineColor}
        onChange={(lineColor) => updateData({ ...data, props: { ...data.props, lineColor } })}
      />

      <SliderInput
        label="Height"
        unit="px"
        step={1}
        min={1}
        max={24}
        value={lineHeight}
        onChange={(lineHeight) => updateData({ ...data, props: { ...data.props, lineHeight } })}
      />

      <StyleInput
        select={[
          {
            style: 'backgroundColor',
            label: 'Background Color',
          },
          { style: 'padding', label: 'Padding' },
        ]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </PanelWrapper>
  );
}
