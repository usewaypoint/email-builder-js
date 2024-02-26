import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { useEditorState } from '../../documents/editor/EditorContext';
import ReaderBlock from '../../documents/reader/ReaderBlock';
import { ReaderProvider } from '../../documents/reader/ReaderContext';

export default function HtmlPanel() {
  const [{ document }] = useEditorState();
  const string = React.useMemo(() => {
    return renderToStaticMarkup(
      <ReaderProvider value={document}>
        <ReaderBlock id="root" />
      </ReaderProvider>
    );
  }, [document]);

  return <pre>{string}</pre>;
}
