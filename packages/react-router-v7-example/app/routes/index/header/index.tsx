import { PanelLeft, PanelRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { toggleInspectorSidebarOpen, toggleTemplatesSidebarOpen } from '~/context/editor';

import { ExtraFunctions } from './extraFunctions';
import { MainTabs } from './mainTabs';
import { ScreenToggle } from './screenToggle';
import { SaveButton } from './saveButton';

export function Header() {
  return (
    <header className="w-full h-12 flex items-center gap-2 px-2 border-b bg-background overflow-auto">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTemplatesSidebarOpen}>
        <PanelLeft className="h-4 w-4" />
      </Button>
      <div className="h-4 w-px shrink-0 bg-border" />

      {/* Main Tabs */}
      <MainTabs />

      <div className="flex-1" />

      {/* Screen Toggle Group */}
      <ScreenToggle />

      {/* Dropdown Menu */}
      <ExtraFunctions />

      {/* Save Button */}
      <SaveButton />

      <div className="h-4 w-px shrink-0 bg-border" />
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleInspectorSidebarOpen}>
        <PanelRight className="h-4 w-4" />
      </Button>
    </header>
  );
}
