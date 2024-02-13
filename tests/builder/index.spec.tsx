import React from 'react';
import { z } from 'zod';

import { render } from '@testing-library/react';

import { buildBlockComponent, buildBlockConfigurationSchema } from '../../src/builders';

describe('builders', () => {
  describe('buildBlockComponent', () => {
    it('renders the specified component', () => {
      const BlockComponent = buildBlockComponent({
        SampleBlock: {
          schema: z.object({ text: z.string() }),
          Component: ({ text }) => <div>{text.toUpperCase()}</div>,
        },
      });
      expect(
        render(<BlockComponent type="SampleBlock" data={{ text: 'Test text!' }} />).asFragment()
      ).toMatchSnapshot();
    });
  });

  describe('buildBlockConfigurationSchema', () => {
    it('adds an id, data, and type to the provided schema', () => {
      const blockConfigurationSchema = buildBlockConfigurationSchema({
        SampleBlock: {
          schema: z.object({ text: z.string() }),
          Component: ({ text }) => <div>{text.toUpperCase()}</div>,
        },
      });

      const sampleValidData = {
        id: 'my id',
        type: 'SampleBlock',
        data: { text: 'Test text!' },
      };
      const parsedData = blockConfigurationSchema.safeParse(sampleValidData);
      expect(parsedData).toEqual({
        success: true,
        data: {
          id: 'my id',
          type: 'SampleBlock',
          data: { text: 'Test text!' },
        },
      });
    });
  });
});
