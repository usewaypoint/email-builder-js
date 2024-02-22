import React from 'react';
import { z } from 'zod';

import { render } from '@testing-library/react';

import buildDocumentReader from '../../src/builders/buildDocumentReader';

describe('builders/buildDocumentReader', () => {
  const { DocumentProvider, Block, useDocument } = buildDocumentReader({
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

  describe('#useDocument', () => {
    it('gets the configurations dictionary', () => {
      let RESULT;
      const ViewBlockConfig = () => {
        RESULT = useDocument();
        return <pre>{JSON.stringify(RESULT)}</pre>;
      };
      render(
        <DocumentProvider value={SAMPLE_DATA}>
          <ViewBlockConfig />
        </DocumentProvider>
      );
      expect(RESULT).toEqual({
        'my id': {
          id: 'my id',
          type: 'SampleBlock',
          data: { text: 'Test text!' },
        },
      });
    });
  });

  describe('#useBlock', () => {
    it('gets the value given an id', () => {
      let RESULT;
      const ViewBlockConfig = () => {
        RESULT = useDocument()['my id'];
        return <pre>{JSON.stringify(RESULT)}</pre>;
      };
      render(
        <DocumentProvider value={SAMPLE_DATA}>
          <ViewBlockConfig />
        </DocumentProvider>
      );
      expect(RESULT).toEqual({
        id: 'my id',
        type: 'SampleBlock',
        data: { text: 'Test text!' },
      });
    });
  });

  describe('#Block', () => {
    it('renders the component from the BlocksConfiguration', () => {
      expect(
        render(
          <DocumentProvider value={SAMPLE_DATA}>
            <Block id="my id" />
          </DocumentProvider>
        ).queryAllByText('TEST TEXT!')
      ).toHaveLength(1);
    });
  });
});
