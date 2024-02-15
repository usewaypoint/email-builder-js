import React from 'react';
import { z } from 'zod';

import buildBlockConfigurationByIdSchema from '../../src/builders/buildBlockConfigurationByIdSchema';

describe('builders/buildBlockConfigurationByIdSchema', () => {
  it('parses an object with id as keys and BlockConfiguration as body', () => {
    const schema = buildBlockConfigurationByIdSchema({
      SampleBlock: {
        schema: z.object({ text: z.string() }),
        Component: ({ text }) => <div>{text.toUpperCase()}</div>,
      },
    });
    const parsedData = schema.safeParse({
      'my id': {
        type: 'SampleBlock',
        data: { text: 'Test text!' },
      },
    });
    expect(parsedData).toEqual({
      success: true,
      data: {
        'my id': {
          type: 'SampleBlock',
          data: { text: 'Test text!' },
        },
      },
    });
  });
});
