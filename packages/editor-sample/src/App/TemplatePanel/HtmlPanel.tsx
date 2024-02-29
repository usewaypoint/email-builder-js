import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { useDocument } from '../../documents/editor/EditorContext';
import ReaderBlock from '../../documents/reader/ReaderBlock';
import { ReaderProvider } from '../../documents/reader/ReaderContext';

export default function HtmlPanel() {
  const document = useDocument();

  const string = React.useMemo(() => {
    return renderToStaticMarkup(
      <ReaderProvider value={document}>
        <ReaderBlock id="root" />
      </ReaderProvider>
    );
  }, [document]);

  return <pre>{string}</pre>;
}
