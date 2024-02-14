import React from 'react';
import { z } from 'zod';

import { render } from '@testing-library/react';

import buildDocumentReader from '../../src/builders/buildDocumentReader';

describe('builders/buildDocumentReader', () => {
  const { DocumentReaderProvider, Block, useBlock } = buildDocumentReader({
    SampleBlock: {
      schema: z.object({ text: z.string() }),
      Component: ({ text }) => <div>{text.toUpperCase()}</div>,
    },
  });

  const SAMPLE_DATA = {
    'my id': {
      id: 'my id',
      type: 'SampleBlock' as const,
      data: { text: 'Test text!' },
    },
  };

  describe('#useBlock', () => {
    it('gets the value given an id', () => {
      const ViewBlockConfig = ({ id }: { id: string }) => {
        const c = useBlock(id);
        return <pre>{JSON.stringify(c)}</pre>;
      };
      expect(
        render(
          <DocumentReaderProvider value={SAMPLE_DATA}>
            <ViewBlockConfig id="my id" />
          </DocumentReaderProvider>
        ).queryAllByText('{"id":"my id","type":"SampleBlock","data":{"text":"Test text!"}}')
      ).toHaveLength(1);
    });
  });

  describe('#Block', () => {
    it('renders the component from the BlocksConfiguration', () => {
      expect(
        render(
          <DocumentReaderProvider value={SAMPLE_DATA}>
            <Block id="my id" />
          </DocumentReaderProvider>
        ).queryAllByText('TEST TEXT!')
      ).toHaveLength(1);
    });
  });
});
