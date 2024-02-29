import React, { useMemo } from 'react';

import { useDocument } from '../../documents/editor/EditorContext';

import TextEditorPanel from './helper/TextEditorPanel';

export default function JsonPanel() {
  const document = useDocument();
  const string = useMemo(() => JSON.stringify(document, null, '  '), [document]);
  return <TextEditorPanel type="json" value={string} />;
}
