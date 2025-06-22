import { Separator } from '~/components/ui/separator';
import { Sheet, SheetContent } from '~/components/ui/sheet';
import { resetDocument, toggleTemplatesSidebarOpen, useTemplatesSidebarOpen } from '~/context/editor';
import { useIsMobile } from '~/hooks/use-mobile';
import { getTemplate, templateOptions } from '~/lib/utils/get-template';

export function TemplateSidebar() {
  const isMobile = useIsMobile();
  const isOpen = useTemplatesSidebarOpen();

  const handleTemplateSelect = (templateString: (typeof templateOptions)[number]['value']) => {
    const template = getTemplate(templateString);
    resetDocument(template);
  };

  const sidebarContent = (
    <>
      {!isMobile && (
        <div className="h-12 border-b px-4 flex items-center">
          <h2 className="text-base">EmailBuilder.js</h2>
        </div>
      )}
      <div className="flex-1 overflow-hidden p-4">
        <div className="space-y-6">
          <div>
            {templateOptions.map((op) => (
              <button
                key={op.title}
                onClick={() => handleTemplateSelect(op.value)}
                className="w-full text-xs text-start text-nowrap px-1.5 py-1 my-0.25 cursor-pointer rounded-md hover:bg-muted"
              >
                {op.title}
              </button>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col">
            <a
              href="https://www.usewaypoint.com/open-source/emailbuilderjs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-xs text-start text-nowrap px-1.5 py-1 my-0.25 cursor-pointer rounded-md hover:bg-muted"
            >
              Learn more
            </a>
            <a
              href="https://github.com/usewaypoint/email-builder-js"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-xs text-start text-nowrap px-1.5 py-1 my-0.25 cursor-pointer rounded-md hover:bg-muted"
            >
              View on GitHub
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
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-base">EmailBuilder.js</h2>
          </div>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={`transition-all border-r bg-background flex flex-col overflow-hidden ${isOpen ? 'w-52' : 'w-0'} `}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      {sidebarContent}
    </div>
  );
}
