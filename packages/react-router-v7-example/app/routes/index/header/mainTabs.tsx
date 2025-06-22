import { Braces, Code, Eye, SquarePen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { setSelectedMainTab, type MainTabOptions } from '~/context/editor';

const headerOptions: { label: MainTabOptions; icon: React.ElementType }[] = [
  { label: 'editor', icon: SquarePen },
  { label: 'preview', icon: Eye },
  { label: 'html', icon: Code },
  { label: 'json', icon: Braces },
];

export function MainTabs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
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

  const handleMainTabClick = (index: number, label: MainTabOptions) => {
    setActiveIndex(index);
    setSelectedMainTab(label);
  };

  return (
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
              onClick={() => handleMainTabClick(index, tab.label)}
            >
              <Icon className="h-4 w-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
