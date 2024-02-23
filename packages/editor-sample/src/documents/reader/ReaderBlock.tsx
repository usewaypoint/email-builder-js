import React from 'react';

import { ReaderBlock as CoreReaderBlock } from './core';
import { useReaderDocument } from './ReaderContext';

type ReaderBlockProps = {
  id: string;
};

/**
 * @param id - Block id
 * @returns ReaderBlock component that loads data from the ReaderDocumentContext
 */
export default function ReaderBlock({ id }: ReaderBlockProps) {
  const document = useReaderDocument();
  const block = document[id];
  if (!block) {
    throw new Error('Could not find block');
  }
  return <CoreReaderBlock {...block} />;
}
