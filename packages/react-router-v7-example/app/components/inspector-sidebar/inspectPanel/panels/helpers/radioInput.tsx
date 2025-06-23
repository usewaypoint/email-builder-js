import { Label } from '~/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { cn } from '~/lib/utils';

type ToggleGroupInputProps = React.ComponentProps<typeof ToggleGroup> & {
  label?: string;
  options?: { label: React.ReactNode; value: string }[];
};

export function ToggleGroupInput({ ...props }: ToggleGroupInputProps) {
  return (
    <div className={cn('w-full space-y-1', props.className)}>
      <Label>{props.label}</Label>
      <ToggleGroup {...props} className={cn('w-full', props.className)}>
        {props.options?.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} aria-label={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
