import React from 'react';
import { z } from 'zod';

import { render } from '@testing-library/react';

import buildDocumentHandlers from '../../src/builders/buildDocumentHandlers';

describe('builders/buildDocumentHandlers', () => {
  const { Schema, Block } = buildDocumentHandlers({
    SampleBlock: {
      schema: z.object({ text: z.string() }),
      Component: ({ text }) => <div>{text.toUpperCase()}</div>,
    },
  });

  describe('#Block', () => {
    it('renders the component from the BlocksConfiguration', () => {
      expect(
        render(<Block type="SampleBlock" data={{ text: 'Test text!' }} />).queryAllByText('TEST TEXT!')
      ).toHaveLength(1);
    });
  });

  describe('#Schema', () => {
    it('builds a BlockConfiguration schema with an id, data, and type', () => {
      const parsedData = Schema.safeParse({
        type: 'SampleBlock',
        data: { text: 'Test text!' },
      });
      expect(parsedData).toEqual({
        success: true,
        data: {
          type: 'SampleBlock',
          data: { text: 'Test text!' },
        },
      });
    });
  });
});
