import { useState } from 'react';

import { AlignBottomIcon, AlignCenterVerticallyIcon, AlignTopIcon } from '@radix-ui/react-icons';

import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import ColumnsContainerPropsSchema, {
  type ColumnsContainerProps,
} from '../../../../documents/blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import { PanelWrapper } from './helpers/panelWrapper';
import { SliderInput } from './helpers/sliderInput';
import { StyleInput } from './helpers/styleInput';
import { ToggleGroupInput } from './helpers/toggleGroupInput';

type ColumnsContainerPanelProps = {
  data: ColumnsContainerProps;
  setData: (v: ColumnsContainerProps) => void;
};
export default function ColumnsContainerPanel({ data, setData }: ColumnsContainerPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const updateData = (d: unknown) => {
    const res = ColumnsContainerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <PanelWrapper title="Columns block">
      <ToggleGroupInput
        variant={'outline'}
        type="single"
        options={[
          { label: '2', value: '2' },
          { label: '3', value: '3' },
        ]}
        label="Number of columns"
        value={data.props?.columnsCount === 2 ? '2' : '3'}
        onValueChange={(v) => {
          updateData({ ...data, props: { ...data.props, columnsCount: Number(v) } });
        }}
      />

      <ColumnWidthsInput
        value={data.props?.fixedWidths}
        onChange={(fixedWidths) => {
          updateData({ ...data, props: { ...data.props, fixedWidths } });
        }}
      />

      <SliderInput
        label="Columns gap"
        unit="px"
        step={4}
        min={0}
        max={80}
        value={data.props?.columnsGap ?? 0}
        onChange={(columnsGap) => updateData({ ...data, props: { ...data.props, columnsGap } })}
      />

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
          { style: 'padding', label: 'Padding' },
        ]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </PanelWrapper>
  );
}

type TWidthValue = number | null | undefined;
type FixedWidths = [TWidthValue, TWidthValue, TWidthValue];

type ColumnsLayoutInputProps = {
  value: FixedWidths | null | undefined;
  onChange: (v: FixedWidths | null | undefined) => void;
};

function ColumnWidthsInput(props: ColumnsLayoutInputProps) {
  const { value } = props;
  let widths: FixedWidths = [null, null, null];
  if (!value) {
    widths = [null, null, null];
  } else {
    widths = value;
  }

  return (
    <div className="flex items-center gap-1">
      {widths.map((v, i) => {
        return (
          <div className="space-y-1">
            <Label className="text-xs" htmlFor={`${i + 1}`}>
              Column {i + 1}
            </Label>
            <Input
              id={`${i + 1}`}
              placeholder="auto"
              value={v ?? undefined}
              onChange={(e) => {
                const value = parseInt(e.target.value);

                const newWidths = [...widths];
                newWidths[i] = isNaN(value) ? null : value;
                props.onChange(newWidths as FixedWidths);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
