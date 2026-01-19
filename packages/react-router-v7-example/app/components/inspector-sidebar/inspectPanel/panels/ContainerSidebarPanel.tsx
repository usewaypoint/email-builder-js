import { useState } from 'react';

import ContainerPropsSchema, { type ContainerProps } from '../../../../documents/blocks/Container/ContainerPropsSchema';

import { PanelWrapper } from './helpers/panelWrapper';
import { StyleInput } from './helpers/styleInput';

type ContainerSidebarPanelProps = {
  data: ContainerProps;
  setData: (v: ContainerProps) => void;
};

export default function ContainerSidebarPanel({ data, setData }: ContainerSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = ContainerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <PanelWrapper title="Container">
      <StyleInput
        select={[
          { style: 'backgroundColor', label: 'Background Color' },
          { style: 'borderColor', label: 'Border Color' },
          { style: 'borderRadius', label: 'Border Radius' },
          { style: 'padding', label: 'Padding' },
        ]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </PanelWrapper>
  );
}
