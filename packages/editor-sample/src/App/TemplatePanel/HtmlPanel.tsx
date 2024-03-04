import React, { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Reader from '@usewaypoint/email-builder/dist/Reader/core';

import { useDocument } from '../../documents/editor/EditorContext';

import TextEditorPanel from './helper/TextEditorPanel';

export default function HtmlPanel() {
  const document = useDocument();

  const string = useMemo(() => {
    return (
      '<!DOCTYPE html>' +
      renderToStaticMarkup(
        <html>
          <head></head>
          <body>
            <Reader document={document} rootBlockId="root" />
          </body>
        </html>
      )
    );
  }, [document]);

  return <TextEditorPanel type="html" value={string} />;
}
