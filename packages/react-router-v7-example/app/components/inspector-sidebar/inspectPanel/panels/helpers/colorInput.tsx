import { Plus, X } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

// Discriminated Union
type ColorInputProps =
  // nullable
  | {
      label?: string;
      nullable: true;
      value?: string | null;
      onChange?: (value: string | null) => void;
    }
  // not nullable
  | {
      label?: string;
      nullable?: false;
      value?: string;
      onChange?: (value: string) => void;
    };

export function ColorInput(props: ColorInputProps) {
  const { label = 'Color', nullable, value } = props;
  const id = `color-input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <div
          className="relative"
          onClick={() => {
            if (props.nullable && !value) {
              props.onChange?.('#000000');
            }
          }}
        >
          <Input
            id={id}
            type="color"
            className="size-8 py-0 px-0.5 rounded cursor-pointer"
            value={value ?? '#FFFFFF'}
            // onChange depends on whether nullable is true or false
            onChange={(e) => {
              if (!props.nullable) {
                props.onChange?.(e.target.value);
              } else {
                props.onChange?.(e.target.value);
              }
            }}
          />

          {nullable && !value && (
            <Plus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground size-4 cursor-pointer hover:text-foreground" />
          )}
        </div>

        {nullable && value && (
          <X
            className="cursor-pointer size-4 text-muted-foreground hover:text-foreground"
            onClick={() => {
              // Type has been narrowed by nullable
              props.onChange?.(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
