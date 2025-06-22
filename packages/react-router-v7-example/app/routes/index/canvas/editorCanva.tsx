import { createContext, useContext } from 'react';
import { EditorBlock as CoreEditorBlock } from '~/documents/editor/core';
import { useDocument } from '~/context/editor';

const EditorBlockContext = createContext<string | null>(null);
export const useCurrentBlockId = () => useContext(EditorBlockContext)!;

interface EditorBlockProps {
  id: string;
}

/**
 *
 * @param id - Block id
 * @returns EditorBlock component that loads data from the EditorDocumentContext
 */
export function EditorCanva({ id }: EditorBlockProps) {
  const document = useDocument();
  const block = document[id];
  if (!block) {
    throw new Error('Could not find block');
  }
  return (
    <EditorBlockContext.Provider value={id}>
      <CoreEditorBlock {...block} />
    </EditorBlockContext.Provider>
  );
}
