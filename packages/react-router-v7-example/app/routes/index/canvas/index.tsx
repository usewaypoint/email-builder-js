import { useDocument, useSelectedMainTab, type MainTabOptions } from '~/context/editor';
import { HtmlCanva } from './htmlCanva';
import { JsonCanva } from './jsonCanva';
import { EditorCanva } from './editorCanva';
import { Reader } from '@usewaypoint/email-builder';

export function Canvas() {
  const canva = useSelectedMainTab();
  const document = useDocument();

  const renderContent = () => {
    switch (canva) {
      case 'editor':
        return <EditorCanva id="root" />;

      case 'preview':
        return <Reader document={document} rootBlockId="root" />;

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
