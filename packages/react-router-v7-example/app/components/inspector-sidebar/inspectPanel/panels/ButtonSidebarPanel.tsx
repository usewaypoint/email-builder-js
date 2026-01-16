import { useState } from 'react';

import { type ButtonProps, ButtonPropsDefaults, ButtonPropsSchema } from '@usewaypoint/block-button';

import { PanelWrapper } from './helpers/panelWrapper';
import { TextInput } from './helpers/textInput';
import { ToggleGroupInput } from './helpers/toggleGroupInput';
import { ColorInput } from './helpers/colorInput';
import { StyleInput } from './helpers/styleInput';

type ButtonSidebarPanelProps = {
  data: ButtonProps;
  setData: (v: ButtonProps) => void;
};
export default function ButtonSidebarPanel({ data, setData }: ButtonSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = ButtonPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const text = data.props?.text ?? ButtonPropsDefaults.text;
  const url = data.props?.url ?? ButtonPropsDefaults.url;
  const fullWidth = data.props?.fullWidth ?? ButtonPropsDefaults.fullWidth;
  const size = data.props?.size ?? ButtonPropsDefaults.size;
  const buttonStyle = data.props?.buttonStyle ?? ButtonPropsDefaults.buttonStyle;
  const buttonTextColor = data.props?.buttonTextColor ?? ButtonPropsDefaults.buttonTextColor;
  const buttonBackgroundColor = data.props?.buttonBackgroundColor ?? ButtonPropsDefaults.buttonBackgroundColor;

  return (
    <PanelWrapper title="Button">
      <TextInput
        label={'Text'}
        value={text}
        onChange={(e) => {
          updateData({ ...data, props: { ...data.props, text: e.target.value } });
        }}
      />

      <TextInput
        label={'Url'}
        value={url}
        onChange={(e) => {
          updateData({ ...data, props: { ...data.props, url: e.target.value } });
        }}
      />

      <ToggleGroupInput
        variant={'outline'}
        type="single"
        options={[
          { label: 'Full', value: 'FULL_WIDTH' },
          { label: 'Auto', value: 'AUTO' },
        ]}
        label="Width"
        value={fullWidth ? 'FULL_WIDTH' : 'AUTO'}
        onValueChange={(v) => {
          updateData({ ...data, props: { ...data.props, fullWidth: v === 'FULL_WIDTH' } });
        }}
      />

      <ToggleGroupInput
        variant={'outline'}
        type="single"
        options={[
          { label: 'Xs', value: 'x-small' },
          { label: 'Sm', value: 'small' },
          { label: 'Md', value: 'medium' },
          { label: 'Lg', value: 'large' },
        ]}
        label="Size"
        value={size}
        onValueChange={(size) => {
          updateData({ ...data, props: { ...data.props, size } });
        }}
      />

      <ToggleGroupInput
        variant={'outline'}
        type="single"
        options={[
          { label: 'Rectangle', value: 'rectangle' },
          { label: 'Rounded', value: 'rounded' },
          { label: 'Pill', value: 'pill' },
        ]}
        label="Style"
        value={buttonStyle}
        onValueChange={(buttonStyle) => {
          updateData({ ...data, props: { ...data.props, buttonStyle } });
        }}
      />

      <ColorInput
        nullable={true}
        label="Text color"
        value={buttonTextColor}
        onChange={(buttonTextColor) => updateData({ ...data, props: { ...data.props, buttonTextColor } })}
      />

      <ColorInput
        nullable={true}
        label="Button color"
        value={buttonBackgroundColor}
        onChange={(buttonBackgroundColor) => updateData({ ...data, props: { ...data.props, buttonBackgroundColor } })}
      />

      <StyleInput
        select={[
          { style: 'backgroundColor', label: 'Background Color' },
          { style: 'fontFamily', label: 'Font Family' },
          { style: 'fontSize', label: 'Font Size' },
          { style: 'fontWeight', label: 'Font Weight' },
          { style: 'textAlign', label: 'Alignment' },
          { style: 'padding', label: 'Padding' },
        ]}
        value={{ ...data.style, fontWeight: data.style?.fontWeight ? data.style.fontWeight : 'bold' }}
        onChange={(style) => updateData({ ...data, style })}
      />
    </PanelWrapper>
  );
}
