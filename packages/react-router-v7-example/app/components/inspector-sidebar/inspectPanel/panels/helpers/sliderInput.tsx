import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { generateSlug } from '~/lib/utils';

/**
 * @example
 * ```tsx
 * <SliderInput
 *   label="Size"
 *   unit="px"
 *   step={3}
 *   min={32}
 *   max={256}
 *   value={size}
 *   onChange={(size) => {
 *     updateData({ ...data, props: { ...data.props, size } });
 *   }}
 * />
 * ```
 */
export function SliderInput({
  value = 0,
  onChange = (v: number) => {},
  label = 'Slider',
  min = 0,
  max = 100,
  step = 1,
  unit = 'px',
  labelHidden = false,
  icon = null,
}: {
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  labelHidden?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="w-full space-y-1">
      {!labelHidden && (
        <Label htmlFor="border-radius">
          {label} ({unit})
        </Label>
      )}
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <Slider value={[value]} min={min} max={max} step={step} onValueChange={(value) => onChange(value[0])} />
        <Input
          id={`border-radius-${generateSlug(label)}`}
          type="number"
          className="w-18 px-1.5"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span className="text-muted-foreground text-xs">{unit}</span>
      </div>
    </div>
  );
}
