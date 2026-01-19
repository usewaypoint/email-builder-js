import { useState } from 'react';

import { type AvatarProps, AvatarPropsDefaults, AvatarPropsSchema } from '@usewaypoint/block-avatar';
import { PanelWrapper } from './helpers/panelWrapper';
import { ToggleGroupInput } from './helpers/toggleGroupInput';
import { SliderInput } from './helpers/sliderInput';
import { StyleInput } from './helpers/styleInput';
import { TextInput } from './helpers/textInput';

type AvatarSidebarPanelProps = {
  data: AvatarProps;
  setData: (v: AvatarProps) => void;
};
export default function AvatarSidebarPanel({ data, setData }: AvatarSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = AvatarPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const size = data.props?.size ?? AvatarPropsDefaults.size;
  const imageUrl = data.props?.imageUrl ?? AvatarPropsDefaults.imageUrl;
  const alt = data.props?.alt ?? AvatarPropsDefaults.alt;
  const shape = data.props?.shape ?? AvatarPropsDefaults.shape;

  return (
    <PanelWrapper title="Avatar">
      <SliderInput
        label="Size"
        unit="px"
        step={3}
        min={32}
        max={256}
        value={size}
        onChange={(size) => {
          updateData({ ...data, props: { ...data.props, size } });
        }}
      />

      <ToggleGroupInput
        variant={'outline'}
        type="single"
        options={[
          { label: 'Circle', value: 'circle' },
          { label: 'Square', value: 'square' },
          { label: 'Rounded', value: 'rounded' },
        ]}
        label="Shape"
        value={shape}
        onValueChange={(shape) => {
          updateData({ ...data, props: { ...data.props, shape } });
        }}
      />

      <TextInput
        label={'Image URL'}
        value={imageUrl}
        onChange={(e) => {
          updateData({ ...data, props: { ...data.props, imageUrl: e.target.value } });
        }}
      />

      <TextInput
        label="Alt text"
        value={alt}
        onChange={(e) => {
          updateData({ ...data, props: { ...data.props, alt: e.target.value } });
        }}
      />

      <StyleInput
        select={[
          { style: 'textAlign', label: 'Alignment' },
          { style: 'padding', label: 'Padding' },
        ]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </PanelWrapper>
  );
}
