import { cn } from '~/lib/utils';

export function PanelWrapper({
  title = 'Panel',
  className = '',
  children,
}: {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('', className)}>
      <h2 className="font-semibold mb-5">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}
