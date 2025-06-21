import type { MainTabOptions } from '~/context/editor';

export function Canvas({ canva }: { canva: MainTabOptions }) {
  const renderContent = () => {
    switch (canva) {
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
      <div className="relative flex-1 bg-muted overflow-auto">{renderContent()}</div>
    </div>
  );
}
