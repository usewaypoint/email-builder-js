import { Monitor, Smartphone } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import {
  screenSizeOptions,
  setSelectedScreenSize,
  useSelectedScreenSize,
  type ScreenSizeOptions,
} from '~/context/editor';

export function ScreenToggle() {
  const screenSize = useSelectedScreenSize();

  const handleValueChange = (value: string) => {
    if (screenSizeOptions.includes(value as ScreenSizeOptions)) {
      setSelectedScreenSize(value as ScreenSizeOptions);
    } else {
      setSelectedScreenSize('desktop'); // Fallback to desktop if invalid value
    }
  };

  return (
    <ToggleGroup type="single" value={screenSize} onValueChange={handleValueChange} className="border gap-0">
      <ToggleGroupItem value="desktop" aria-label="Desktop view" size="sm" className="rounded-none">
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="mobile" aria-label="Mobile view" size="sm" className="rounded-none">
        <Smartphone className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
