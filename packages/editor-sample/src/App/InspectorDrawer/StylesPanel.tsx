import React from 'react';

import { TEditorBlock } from '../../documents/editor/core';
import { setEditorState, useDocument } from '../../documents/editor/EditorContext';

import EmailLayoutSidebarPanel from './ConfigurationPanel/input-panels/EmailLayoutSidebarPanel';

export default function StylesPanel() {
  const block = useDocument().root;
  if (!block) {
    return <p>Block not found</p>;
  }

  const setBlock = (conf: TEditorBlock) =>
    setEditorState({
      document: { ...document, root: conf },
    });
  const { data, type } = block;
  if (type !== 'EmailLayout') {
    throw new Error('Expected "root" element to be of type EmailLayout');
  }
  return <EmailLayoutSidebarPanel key="root" data={data} setData={(data) => setBlock({ type, data })} />;
}
