import { useState } from 'react';

import { type ImageProps, ImagePropsSchema } from '@usewaypoint/block-image';

import { AlignBottomIcon, AlignCenterVerticallyIcon, AlignTopIcon } from '@radix-ui/react-icons';
import { PanelWrapper } from './helpers/panelWrapper';
import { StyleInput } from './helpers/styleInput';
import { TextInput } from './helpers/textInput';
import { ToggleGroupInput } from './helpers/toggleGroupInput';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

type ImageSidebarPanelProps = {
  data: ImageProps;
  setData: (v: ImageProps) => void;
};
export default function ImageSidebarPanel({ data, setData }: ImageSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = ImagePropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <PanelWrapper title="Image">
      <TextInput
        label="Source URL"
        value={data.props?.url ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          const url = v.trim().length === 0 ? null : v.trim();
          updateData({ ...data, props: { ...data.props, url } });
        }}
      />

      <TextInput
        label="Alt text"
        value={data.props?.alt ?? ''}
        onChange={(e) => updateData({ ...data, props: { ...data.props, alt: e.target.value } })}
      />

      <TextInput
        label="Click through URL"
        value={data.props?.linkHref ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          const linkHref = v.trim().length === 0 ? null : v.trim();
          updateData({ ...data, props: { ...data.props, linkHref } });
        }}
      />

      <div className="flex gap-1">
        <div className="space-y-0.5">
          <Label className="text-xs" htmlFor="width">
            Width
          </Label>
          <Input
            id="width"
            placeholder="auto"
            value={data.props?.width ?? ''}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              updateData({ ...data, props: { ...data.props, width: isNaN(value) ? null : value } });
            }}
          />
        </div>
        <div className="space-y-0.5">
          <Label className="text-xs" htmlFor="height">
            Height
          </Label>
          <Input
            id="height"
            placeholder="auto"
            value={data.props?.height ?? ''}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              updateData({ ...data, props: { ...data.props, height: isNaN(value) ? null : value } });
            }}
          />
        </div>
      </div>

      <ToggleGroupInput
        variant={'outline'}
        type="single"
        options={[
          { label: <AlignTopIcon />, value: 'top' },
          { label: <AlignCenterVerticallyIcon />, value: 'middle' },
          { label: <AlignBottomIcon />, value: 'bottom' },
        ]}
        label={'Alignment'}
        value={data.props?.contentAlignment ?? 'middle'}
        onValueChange={(contentAlignment) => {
          updateData({ ...data, props: { ...data.props, contentAlignment } });
        }}
      />

      <StyleInput
        select={[
          { style: 'backgroundColor', label: 'Background Color' },
          { style: 'textAlign', label: 'Alignment' },
          { style: 'padding', label: 'Padding' },
        ]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </PanelWrapper>
  );
}
