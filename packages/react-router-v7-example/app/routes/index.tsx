import { Button } from '~/components/ui/button';
import type { Route } from './+types/index';

import { useState, useRef, useEffect } from 'react';
import {
  Maximize2,
  PanelLeft,
  PanelRight,
  SquarePen,
  Eye,
  Code,
  Braces,
  EllipsisVertical,
  Download,
  Upload,
  Share2,
  Monitor,
  Smartphone,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { SampleSidebar } from '~/components/sample-sidebar';
import { InspectorSidebar } from '~/components/inspector-sidebar';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

const headerTabs = ['SquarePen', 'Preview', 'Code', 'Braces'];
const headerTabIcons = [SquarePen, Eye, Code, Braces];

function CanvasArea() {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Canvas */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Maximize2 className="h-12 w-12 mx-auto text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Canvas Area</p>
            <p className="text-sm text-gray-400">Design your content here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
  const [deviceType, setDeviceType] = useState('desktop');
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <SampleSidebar isOpen={leftSidebarOpen} onClose={() => setLeftSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex h-14 items-center gap-2 border-b bg-background px-3 overflow-scroll">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            >
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
                {headerTabs.map((tab, index) => {
                  const Icon = headerTabIcons[index];
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
                      onClick={() => setActiveIndex(index)}
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
              value={deviceType}
              onValueChange={setDeviceType}
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
                <DropdownMenuItem onClick={() => handleNotImplemented('Download')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNotImplemented('Import')}>
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

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            >
              <PanelRight className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex flex-1 min-h-0">
          <CanvasArea />
        </div>
      </div>

      {/* Right Sidebar */}
      <InspectorSidebar isOpen={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />
    </div>
  );
}
