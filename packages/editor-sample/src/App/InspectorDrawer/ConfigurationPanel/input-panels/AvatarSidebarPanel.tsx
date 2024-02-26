import React, { useState } from 'react';

import { AspectRatioOutlined } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';

import { AvatarProps, AvatarPropsSchema } from '../../../../documents/blocks/Avatar';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import { NullableColorInput } from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import SliderInput from './helpers/inputs/SliderInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

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

  return (
    <BaseSidebarPanel title="Avatar block">
      <SliderInput
        label="Size"
        iconLabel={<AspectRatioOutlined sx={{ color: 'text.secondary' }} />}
        units="px"
        step={3}
        min={32}
        max={256}
        defaultValue={data.props.size}
        onChange={(size) => {
          updateData({ ...data, props: { ...data.props, size } });
        }}
      />
      <RadioGroupInput
        label="Shape"
        defaultValue={data.props.shape}
        onChange={(shape) => {
          updateData({ ...data, props: { ...data.props, shape } });
        }}
      >
        <ToggleButton value="circle">Circle</ToggleButton>
        <ToggleButton value="square">Square</ToggleButton>
        <ToggleButton value="rounded">Rounded</ToggleButton>
      </RadioGroupInput>
      <TextInput
        label="Image URL"
        helperText="Leave blank to use fallback text."
        defaultValue={data.props.imageUrl}
        onChange={(imageUrl) => {
          updateData({ ...data, props: { ...data.props, imageUrl } });
        }}
      />
      <TextInput
        label="Fallback text"
        helperText="Automatically truncates to 2 characters max."
        defaultValue={data.props.fallbackText}
        onChange={(fallbackText) => {
          updateData({ ...data, props: { ...data.props, fallbackText } });
        }}
      />
      <NullableColorInput
        label="Fallback text background color"
        secondarySwatch={[]}
        defaultValue={data.props.fallbackColor}
        onChange={(fallbackColor) => {
          updateData({ ...data, props: { ...data.props, fallbackColor } });
        }}
      />

      <MultiStylePropertyPanel
        names={['textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
