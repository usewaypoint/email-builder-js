import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

type TextInputProps = React.ComponentProps<typeof Input> & {
  label?: string;
};

/**
 * @example
 * ```tsx
 * <TextInput
 *   label={'Text'}
 *   value={text}
 *   onChange={(e) => {
 *     updateData({ ...data, props: { ...data.props, text: e.target.value } });
 *   }}
 * />
 * ```
 */
export function TextInput({ label, className, ...props }: TextInputProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
}
