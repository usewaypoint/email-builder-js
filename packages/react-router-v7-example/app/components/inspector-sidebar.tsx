import { Eye, Palette, Settings2 } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Sheet, SheetContent } from '~/components/ui/sheet';
import { Slider } from '~/components/ui/slider';
import {
  setSidebarTab,
  toggleInspectorSidebarOpen,
  useInspectorSidebarOpen,
  useSelectedSidebarTab,
} from '~/context/editor';
import { useIsMobile } from '~/hooks/use-mobile';

const tabs = [
  { id: 'styles', label: 'Styles' },
  { id: 'block-configuration', label: 'Inspect' },
] as const;

export function InspectorSidebar() {
  const sidebarTab = useSelectedSidebarTab();
  const isMobile = useIsMobile();
  const isOpen = useInspectorSidebarOpen();

  const sidebarContent = (
    <>
      <div className="h-12 border-b px-4 flex items-end">
        <div className="flex w-full h-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSidebarTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors border-b cursor-pointer ${
                sidebarTab === tab.id
                  ? 'text-foreground border-foreground'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {sidebarTab === 'block-configuration' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Element Inspector</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Element</Label>
                  <div className="mt-1 p-2 bg-muted rounded text-sm">{'<div>'}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Class</Label>
                  <Input className="mt-1" placeholder="Enter class name" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">ID</Label>
                  <Input className="mt-1" placeholder="Enter ID" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Properties</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Width:</span>
                  <span>200px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height:</span>
                  <span>100px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span>relative</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {sidebarTab === 'styles' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Styling Options</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Background Color</Label>
                  <div className="mt-2 flex gap-2">
                    <Button variant="outline" size="icon" className="w-8 h-8 p-0 bg-red-500 hover:bg-red-600" />
                    <Button variant="outline" size="icon" className="w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600" />
                    <Button variant="outline" size="icon" className="w-8 h-8 p-0 bg-green-500 hover:bg-green-600" />
                    <Button variant="outline" size="icon" className="w-8 h-8 p-0 bg-yellow-500 hover:bg-yellow-600" />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Opacity</Label>
                  <div className="mt-2">
                    <Slider defaultValue={[100]} max={100} step={1} />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Border Radius</Label>
                  <div className="mt-2">
                    <Slider defaultValue={[0]} max={50} step={1} />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Font Size</Label>
                  <Input className="mt-1" placeholder="16px" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Advanced</h3>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Settings2 className="h-4 w-4" />
                <span>Advanced Settings</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={toggleInspectorSidebarOpen}>
        <SheetContent side="right" className="w-80 p-0 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Properties</h2>
          </div>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={`transition-all border-l bg-background flex flex-col ${isOpen ? 'w-80' : 'w-0'}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      {sidebarContent}
    </div>
  );
}
