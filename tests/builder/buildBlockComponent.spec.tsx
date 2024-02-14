import React from 'react';
import { z } from 'zod';

import { render } from '@testing-library/react';

import buildBlockComponent from '../../src/builders/buildBlockComponent';

describe('builders/buildBlockComponent', () => {
  it('renders the specified component', () => {
    const BlockComponent = buildBlockComponent({
      SampleBlock: {
        schema: z.object({ text: z.string() }),
        Component: ({ text }) => <div>{text.toUpperCase()}</div>,
      },
    });
    expect(render(<BlockComponent type="SampleBlock" data={{ text: 'Test text!' }} />).asFragment()).toMatchSnapshot();
  });
});
