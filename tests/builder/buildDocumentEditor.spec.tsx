import React from 'react';
import { z } from 'zod';

import { act, render } from '@testing-library/react';

import buildDocumentEditor from '../../src/builders/buildDocumentEditor';

describe('builders/buildDocumentEditor', () => {
  const { useBlockState, Block, DocumentEditorProvider } = buildDocumentEditor({
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

  describe('#useBlockState', () => {
    it('returns a getter and a setter tuple', () => {
      let value: any;
      let setValue: any;
      const ViewBlockConfig = ({ id }: { id: string }) => {
        const tuple = useBlockState(id);
        value = tuple[0];
        setValue = tuple[1];
        return (
          <pre>
            {tuple[0].type} - {tuple[0].data.text}
          </pre>
        );
      };

      expect(
        render(
          <DocumentEditorProvider value={SAMPLE_DATA}>
            <ViewBlockConfig id="my id" />
          </DocumentEditorProvider>
        ).queryAllByText('SampleBlock - Test text!')
      ).toHaveLength(1);

      act(() => {
        setValue({
          id: 'my id',
          type: 'SampleBlock' as const,
          data: { text: 'changed text?' },
        });
      });

      expect(
        render(
          <DocumentEditorProvider value={SAMPLE_DATA}>
            <ViewBlockConfig id="my id" />
          </DocumentEditorProvider>
        ).queryAllByText('SampleBlock - changed text?')
      ).toHaveLength(1);
      expect(value).toEqual({
        id: 'my id',
        type: 'SampleBlock',
        data: {
          text: 'Test text!',
        },
      });
    });
  });

  describe('#Block', () => {
    it('renders the component from the BlocksConfiguration', () => {
      expect(
        render(
          <DocumentEditorProvider value={SAMPLE_DATA}>
            <Block id="my id" />
          </DocumentEditorProvider>
        ).queryAllByText('TEST TEXT!')
      ).toHaveLength(1);
    });
  });
});
