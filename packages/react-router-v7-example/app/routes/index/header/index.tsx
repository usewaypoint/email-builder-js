import { PanelLeft, PanelRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { toggleInspectorSidebarOpen, toggleTemplatesSidebarOpen } from '~/context/editor';

import { ExtraFunctions } from './extraFunctions';
import { MainTabs } from './mainTabs';
import { ScreenToggle } from './screenToggle';

export function Header() {
  return (
    <header className="flex h-12 items-center gap-2 border-b bg-background px-3 overflow-scroll">
      <div className="w-full flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTemplatesSidebarOpen}>
          <PanelLeft className="h-4 w-4" />
        </Button>
        <div className="h-4 w-px bg-border" />

        {/* Main Tabs */}
        <MainTabs />

        <div className="flex-1" />

        {/* Screen Toggle Group */}
        <ScreenToggle />

        {/* Dropdown Menu */}
        <ExtraFunctions />

        {/* Save Button */}
        <Button variant="ghost" size="sm">
          SAVE
        </Button>

        <div className="h-4 w-px bg-border" />
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleInspectorSidebarOpen}>
          <PanelRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
