import { Sheet, SheetContent, SheetDescription, SheetTitle } from '~/components/ui/sheet';
import {
  setSidebarTab,
  toggleInspectorSidebarOpen,
  useInspectorSidebarOpen,
  useSelectedSidebarTab,
} from '~/context/editor';
import { useIsMobile } from '~/hooks/use-mobile';
import { InspectPanel } from './inspectPanel';
import { StylesPanel } from './stylesPanel';

const tabs = [
  { id: 'styles', label: 'Styles' },
  { id: 'block-configuration', label: 'Inspect' },
] as const;

export function InspectorSidebar() {
  const sidebarTab = useSelectedSidebarTab();
  const isMobile = useIsMobile();
  const isOpen = useInspectorSidebarOpen();

  const renderCurrentSidebarPanel = () => {
    switch (sidebarTab) {
      case 'block-configuration':
        return <InspectPanel />;
      case 'styles':
        return <StylesPanel />;
    }
  };

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
      <div className="flex-1 overflow-auto p-4">{renderCurrentSidebarPanel()}</div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={toggleInspectorSidebarOpen}>
        <SheetContent side="right" className="w-80 p-0 flex flex-col">
          <SheetTitle hidden></SheetTitle>
          <SheetDescription hidden></SheetDescription>
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
