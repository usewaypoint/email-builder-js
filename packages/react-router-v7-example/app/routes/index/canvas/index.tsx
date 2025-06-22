import { Reader } from '@usewaypoint/email-builder';
import { useDocument, useSelectedMainTab, useSelectedScreenSize } from '~/context/editor';
import EditorBlock from '~/documents/editor/EditorBlock';
import { HtmlCanva } from './htmlCanva';
import { JsonCanva } from './jsonCanva';

export function Canvas() {
  const document = useDocument();
  const canva = useSelectedMainTab();
  const screenSize = useSelectedScreenSize();

  const renderContent = () => {
    switch (canva) {
      case 'editor':
        return (
          <div className={`grow h-auto ${screenSize === 'mobile' ? 'w-[370px] mx-auto my-3' : 'w-full'}`}>
            <EditorBlock id="root" />
          </div>
        );

      case 'preview':
        return (
          <div className={`grow h-auto ${screenSize === 'mobile' ? 'w-[370px] mx-auto my-3' : 'w-full'}`}>
            <Reader document={document} rootBlockId="root" />
          </div>
        );

      case 'html':
        return <HtmlCanva />;

      case 'json':
        return <JsonCanva />;

      default:
        return null;
    }
  };

  return <div className="relative w-full h-full flex-1 flex flex-col overflow-scroll">{renderContent()}</div>;
}
