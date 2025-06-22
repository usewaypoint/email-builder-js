import { Separator } from '~/components/ui/separator';
import { Sheet, SheetContent } from '~/components/ui/sheet';
import { toggleTemplatesSidebarOpen, useTemplatesSidebarOpen } from '~/context/editor';
import { useIsMobile } from '~/hooks/use-mobile';

const tools = ['Select', 'Rectangle', 'Circle', 'Triangle', 'Text', 'Image'];

export function TemplateSidebar() {
  const isMobile = useIsMobile();
  const isOpen = useTemplatesSidebarOpen();

  const sidebarContent = (
    <>
      {!isMobile && (
        <div className="h-14 border-b px-4 flex items-center">
          <h2 className="text-lg font-semibold">EmailBuilder.js</h2>
        </div>
      )}
      <div className="flex-1 overflow-hidden p-4">
        <div className="space-y-6">
          <div>
            {tools.map((tool) => (
              <button
                key={tool}
                className="w-full flex justify-start items-center gap-2 px-1 py-0.5 cursor-pointer rounded-md hover:bg-muted"
              >
                <span className="text-sm">{tool}</span>
              </button>
            ))}
          </div>

          <Separator />

          <div>
            <a
              href="https://www.usewaypoint.com/open-source/emailbuilderjs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-start items-center gap-2 px-1 py-0.5 cursor-pointer rounded-md hover:bg-muted"
            >
              <span className="text-sm">Learn more</span>
            </a>
            <a
              href="https://github.com/usewaypoint/email-builder-js"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-start items-center gap-2 px-1 py-0.5 cursor-pointer rounded-md hover:bg-muted"
            >
              <span className="text-sm">View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={toggleTemplatesSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Tools</h2>
          </div>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={`transition-all border-r bg-background flex flex-col overflow-hidden ${isOpen ? 'w-48' : 'w-0'} `}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      {sidebarContent}
    </div>
  );
}
