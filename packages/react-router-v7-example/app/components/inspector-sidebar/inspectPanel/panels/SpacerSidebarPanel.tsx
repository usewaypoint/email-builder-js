import { useState } from 'react';

import { type SpacerProps, SpacerPropsDefaults, SpacerPropsSchema } from '@usewaypoint/block-spacer';

import { PanelWrapper } from './helpers/panelWrapper';
import { SliderInput } from './helpers/sliderInput';

type SpacerSidebarPanelProps = {
  data: SpacerProps;
  setData: (v: SpacerProps) => void;
};
export default function SpacerSidebarPanel({ data, setData }: SpacerSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = SpacerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <PanelWrapper title="Spacer">
      <SliderInput
        label="Height"
        unit="px"
        step={4}
        min={4}
        max={128}
        value={data.props?.height ?? SpacerPropsDefaults.height}
        onChange={(height) => updateData({ ...data, props: { ...data.props, height } })}
      />
    </PanelWrapper>
  );
}
