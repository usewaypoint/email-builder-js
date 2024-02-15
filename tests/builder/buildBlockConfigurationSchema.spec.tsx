import React from 'react';
import { z } from 'zod';

import buildBlockConfigurationSchema from '../../src/builders/buildBlockConfigurationSchema';

describe('builders/buildBlockConfigurationSchema', () => {
  it('builds a BlockConfiguration schema with an id, data, and type', () => {
    const blockConfigurationSchema = buildBlockConfigurationSchema({
      SampleBlock: {
        schema: z.object({ text: z.string() }),
        Component: ({ text }) => <div>{text.toUpperCase()}</div>,
      },
    });
    const parsedData = blockConfigurationSchema.safeParse({
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
