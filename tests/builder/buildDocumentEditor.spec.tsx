import React from 'react';
import { z } from 'zod';

import { act, render } from '@testing-library/react';

import buildDocumentEditor from '../../src/builders/buildDocumentEditor';

describe('builders/buildDocumentEditor', () => {
  const { useDocumentState, useBlockState, Block, DocumentEditorProvider } = buildDocumentEditor({
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

  describe('#useDocumentState', () => {
    it('returns a getter and a setter tuple', () => {
      let tuple: any;
      const ViewBlockConfig = () => {
        tuple = useDocumentState();
        return <pre>{JSON.stringify(tuple[0])}</pre>;
      };

      const NODE = (
        <DocumentEditorProvider value={SAMPLE_DATA}>
          <ViewBlockConfig />
        </DocumentEditorProvider>
      );
      const { rerender } = render(NODE);
      expect(tuple[0]).toEqual({
        'my id': {
          id: 'my id',
          type: 'SampleBlock',
          data: { text: 'Test text!' },
        },
      });

      act(() => {
        tuple[1]({
          'another id': {
            id: 'another id',
            type: 'SampleBlock',
            data: { text: 'changed text?' },
          },
        });
      });

      rerender(NODE);
      expect(tuple[0]).toEqual({
        'another id': {
          id: 'another id',
          type: 'SampleBlock' as const,
          data: { text: 'changed text?' },
        },
      });
    });
  });

  describe('#useBlockState', () => {
    it('returns a getter and a setter tuple', () => {
      let tuple: any;
      const ViewBlockConfig = () => {
        tuple = useBlockState('my id');
        return <pre>{JSON.stringify(tuple[0])}</pre>;
      };

      const NODE = (
        <DocumentEditorProvider value={SAMPLE_DATA}>
          <ViewBlockConfig />
        </DocumentEditorProvider>
      );
      const { rerender } = render(NODE);
      expect(tuple[0]).toEqual({
        id: 'my id',
        type: 'SampleBlock',
        data: { text: 'Test text!' },
      });

      act(() => {
        tuple[1]({
          ...tuple[0],
          data: { text: 'changed text?' },
        });
      });

      rerender(NODE);
      expect(tuple[0]).toEqual({
        id: 'my id',
        type: 'SampleBlock',
        data: { text: 'changed text?' },
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
