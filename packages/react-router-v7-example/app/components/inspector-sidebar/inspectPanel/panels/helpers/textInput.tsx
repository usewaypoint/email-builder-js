import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
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

type TextareaInputProps = React.ComponentProps<typeof Textarea> & {
  label?: string;
  onChange?: (v: string) => void;
};

/**
 * @example
 * ```tsx
 * <TextareaInput
 *   label={'Textarea'}
 *   value={text}
 *   onChange={(e) => {
 *     updateData({ ...data, props: { ...data.props, text: e.target.value } });
 *   }}
 * />
 * ```
 */
export function TextareaInput({ label, onChange, className, ...props }: TextareaInputProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <Label>{label}</Label>
      <Textarea {...props} onChange={(e) => onChange?.(e.target.value)} />
    </div>
  );
}
