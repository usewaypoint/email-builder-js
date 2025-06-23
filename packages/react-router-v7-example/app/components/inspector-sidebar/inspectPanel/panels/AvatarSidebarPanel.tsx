import { useState } from 'react';

import { type AvatarProps, AvatarPropsDefaults, AvatarPropsSchema } from '@usewaypoint/block-avatar';
import { PanelWrapper } from './helpers/panelWrapper';
import { ToggleGroupInput } from './helpers/radioInput';
import { SliderInput } from './helpers/sliderInput';

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

      {/* <TextInput
        label="Image URL"
        defaultValue={imageUrl}
        onChange={(imageUrl) => {
          updateData({ ...data, props: { ...data.props, imageUrl } });
        }}
      />
      <TextInput
        label="Alt text"
        defaultValue={alt}
        onChange={(alt) => {
          updateData({ ...data, props: { ...data.props, alt } });
        }}
      />

      <MultiStylePropertyPanel
        names={['textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      /> */}
    </PanelWrapper>
  );
}
