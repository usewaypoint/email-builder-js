import type { Route } from './+types/index';

import {
  Braces,
  Code,
  Download,
  EllipsisVertical,
  Eye,
  Monitor,
  PanelLeft,
  PanelRight,
  Share2,
  Smartphone,
  SquarePen,
  Upload,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { InspectorSidebar } from '~/components/inspector-sidebar';
import { TemplateSidebar } from '~/components/template-sidebar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import {
  resetDocument,
  setSelectedMainTab,
  setSelectedScreenSize,
  toggleInspectorSidebarOpen,
  toggleTemplatesSidebarOpen,
  useSelectedScreenSize,
  type MainTabOptions,
} from '~/context/editor';
import { useDownloadUrl } from '~/lib/utils/download-json';
import validateJsonStringValue from '~/lib/utils/validate-json-string';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

const headerOptions: { label: MainTabOptions; icon: React.ElementType }[] = [
  { label: 'editor', icon: SquarePen },
  { label: 'preview', icon: Eye },
  { label: 'html', icon: Code },
  { label: 'json', icon: Braces },
];

function CanvasArea({ activeIndex }: { activeIndex?: number }) {
  const currentOption = headerOptions[activeIndex || 0];

  const renderContent = () => {
    switch (currentOption.label) {
      case 'editor':
        return <div className="p-3">Edit your content here.</div>;

      case 'preview':
        return <div className="p-3">Preview your design here.</div>;

      case 'html':
        return <div className="p-3">HTML code will be displayed here.</div>;

      case 'json':
        return <div className="p-3">JSON data will be displayed here.</div>;

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Canvas */}

      <div className="relative flex-1 bg-muted overflow-auto">{renderContent()}</div>
    </div>
  );
}

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const screenSize = useSelectedScreenSize();
  const downloadUrl = useDownloadUrl();

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const firstElement = tabRefs.current[0];
      if (firstElement) {
        const { offsetLeft, offsetWidth } = firstElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, []);

  const handleNotImplemented = (action: string) => {
    alert(`${action} not implemented`);
  };

  const handleImportJson = (value: string) => {
    const { error, data } = validateJsonStringValue(value);
    if (error || !data) return alert(error || 'Invalid JSON');

    resetDocument(data);
    alert('JSON imported successfully');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <TemplateSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex h-14 items-center gap-2 border-b bg-background px-3 overflow-scroll">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTemplatesSidebarOpen}>
              <PanelLeft className="h-4 w-4" />
            </Button>

            {/* Dynamic Tabs */}
            <div className="relative">
              {/* Hover Highlight */}
              <div
                className="absolute h-[32px] transition-all duration-300 ease-out bg-muted/50 rounded-md flex items-center"
                style={{
                  ...hoverStyle,
                  opacity: hoveredIndex !== null ? 1 : 0,
                }}
              />

              {/* Active Indicator */}
              <div
                className="absolute bottom-[-6px] h-[2px] bg-foreground transition-all duration-300 ease-out"
                style={activeStyle}
              />

              {/* Tabs */}
              <div className="relative flex space-x-1 items-center">
                {headerOptions.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <div
                      key={index}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[32px] flex items-center gap-2 ${
                        index === activeIndex ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => {
                        setActiveIndex(index);
                        setSelectedMainTab(tab.label);
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            {/* Device Toggle Group */}
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

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <a href={downloadUrl} download={'email-builder.json'}>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                </a>
                <DropdownMenuItem
                  onClick={() => {
                    const jsonString = prompt('Paste your JSON here:');
                    if (jsonString) {
                      handleImportJson(jsonString);
                    } else {
                      alert('No value provided');
                    }
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNotImplemented('Share')}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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

        {/* Canvas Area */}
        <div className="flex flex-1 min-h-0">
          <CanvasArea activeIndex={activeIndex} />
        </div>
      </div>

      {/* Right Sidebar */}
      <InspectorSidebar />
    </div>
  );
}
