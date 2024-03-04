import React, { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Reader from '@usewaypoint/email-builder/dist/Reader/core';

import { useDocument } from '../../documents/editor/EditorContext';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

export default function HtmlPanel() {
  const document = useDocument();
  const code = useMemo(() => {
    return (
      '<!DOCTYPE html>' +
      renderToStaticMarkup(
        <html>
          <body>
            <Reader document={document} rootBlockId="root" />
          </body>
        </html>
      )
    );
  }, [document]);

  return <HighlightedCodePanel type="html" value={code} />;
}
