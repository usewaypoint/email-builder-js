import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import { generateSlug } from '~/lib/utils';

type BooleanInputProps = {
  label?: string;
  value?: boolean | null;
  onChange?: (value: boolean | null) => void;
};

/**
 * @example
 * ```tsx
 * <BooleanInput
 *   label="Markdown"
 *   value={data.props?.markdown ?? false}
 *   onChange={(markdown) => updateData({ ...data, props: { ...data.props, markdown } })}
 * />
 * ```
 */
export function BooleanInput(props: BooleanInputProps) {
  const { label = 'Checked', value } = props;
  const id = `boolean-input-${generateSlug(label)}`;

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={value ?? false}
        onCheckedChange={(boolean) => {
          props.onChange?.(boolean);
        }}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
