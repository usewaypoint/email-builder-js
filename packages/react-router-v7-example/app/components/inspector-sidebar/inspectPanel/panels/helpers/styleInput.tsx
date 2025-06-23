import { AlignCenter, AlignLeft, AlignRight, AlignStartHorizontal } from 'lucide-react';
import { Label } from '~/components/ui/label';
import type { TStyle } from '~/documents/blocks/helpers/TStyle';
import { cn } from '~/lib/utils';
import { ToggleGroupInput } from './radioInput';
import { SliderInput } from './sliderInput';

type StyleInputProps = {
  select: { style: keyof TStyle; label: string }[];
  className?: string;
  value?: Partial<TStyle> | null;
  onChange?(value: Partial<TStyle>): void;
};

/**
 * @example
 * ```tsx
 * <StyleInput
 *   select={[
 *     { style: 'textAlign', label: 'Alignment' },
 *     { style: 'padding', label: 'Padding' },
 *   ]}
 *   value={data.style}
 *   onChange={(style) => updateData({ ...data, style })}
 * />
 */
export function StyleInput(props: StyleInputProps) {
  function handleStyleChange<T>(key: keyof TStyle, value: T) {
    const newStyle = { ...props.value, [key]: value };
    if (props.onChange) {
      props.onChange(newStyle);
    }
  }

  return (
    <div className={cn('space-y-5', props.className)}>
      {props.select.map((item) => {
        switch (item.style) {
          case 'backgroundColor':
            break;

          case 'borderColor':
            break;

          case 'borderRadius':
            break;

          case 'color':
            break;

          case 'fontFamily':
            break;

          case 'fontSize':
            break;

          case 'fontWeight':
            break;

          case 'padding': {
            const paddingValue = props.value?.padding || { top: 0, bottom: 0, left: 0, right: 0 };
            const icons = {
              top: <AlignStartHorizontal className="w-4 h-4" />,
              bottom: <AlignStartHorizontal className="w-4 h-4 transform rotate-180" />,
              left: <AlignStartHorizontal className="w-4 h-4 transform rotate-90" />,
              right: <AlignStartHorizontal className="w-4 h-4 transform -rotate-90" />,
            };

            return (
              <div key={item.style} className="space-y-1">
                <Label className="text-sm font-medium">{item.label}</Label>
                <div className="space-y-0.1">
                  <div className="w-full flex flex-col items-start gap-1">
                    {Object.entries(paddingValue).map(([k, v]) => {
                      return (
                        <SliderInput
                          unit="px"
                          step={1}
                          min={0}
                          max={100}
                          value={v}
                          onChange={(value) => {
                            handleStyleChange('padding', {
                              ...props.value?.padding,
                              [k]: value,
                            });
                          }}
                          labelHidden
                          icon={icons[k as keyof typeof icons]}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

          case 'textAlign':
            return (
              <ToggleGroupInput
                key={item.style}
                variant={'outline'}
                type="single"
                options={[
                  { label: <AlignLeft />, value: 'left' },
                  { label: <AlignCenter />, value: 'center' },
                  { label: <AlignRight />, value: 'right' },
                ]}
                label={item.label}
                value={props.value?.textAlign ?? 'left'}
                onValueChange={(textAlign) => {
                  handleStyleChange('textAlign', textAlign);
                }}
              />
            );
        }
      })}
    </div>
  );

  return;
}
