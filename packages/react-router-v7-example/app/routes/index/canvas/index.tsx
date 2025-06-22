import { useSelectedMainTab, type MainTabOptions } from '~/context/editor';
import { HtmlCanva } from './htmlCanva';
import { JsonCanva } from './jsonCanva';

export function Canvas() {
  const canva = useSelectedMainTab();

  const renderContent = () => {
    switch (canva) {
      case 'editor':
        return <div className="p-3">Edit your content here.</div>;

      case 'preview':
        return <div className="p-3">Preview your design here.</div>;

      case 'html':
        return <HtmlCanva />;

      case 'json':
        return <JsonCanva />;

      default:
        return null;
    }
  };

  return <div className="relative w-full h-full flex-1 overflow-scroll p-3">{renderContent()}</div>;
}
