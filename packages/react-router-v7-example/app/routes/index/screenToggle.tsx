import { Monitor, Smartphone } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { setSelectedScreenSize, useSelectedScreenSize } from '~/context/editor';

export function ScreenToggle() {
  const screenSize = useSelectedScreenSize();

  return (
    <ToggleGroup
      type="single"
      value={screenSize}
      onValueChange={setSelectedScreenSize}
      className="border rounded-md gap-0 overflow-hidden"
    >
      <ToggleGroupItem value="desktop" aria-label="Desktop view" size="sm" className="rounded-none">
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="mobile" aria-label="Mobile view" size="sm" className="rounded-none">
        <Smartphone className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
