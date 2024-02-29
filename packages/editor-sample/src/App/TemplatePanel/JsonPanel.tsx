import React, { useMemo } from 'react';

import { useEditorState } from '../../documents/editor/EditorContext';

import TextEditorPanel from './helper/TextEditorPanel';

export default function JsonPanel() {
  const [{ document }] = useEditorState();
  const string = useMemo(() => JSON.stringify(document, null, '  '), [document]);
  return <TextEditorPanel value={string} />;
}
