import React from 'react';

import { render } from '@testing-library/react';

import { Heading } from '.';

describe('Heading', () => {
  it('renders with default values', () => {
    expect(render(<Heading />).asFragment()).toMatchSnapshot();
  });

  it('renders with style', () => {
    const style = {
      backgroundColor: '#444333',
      color: '#101010',
      fontFamily: 'HEAVY_SANS' as const,
      fontWeight: 'normal' as const,
      padding: {
        top: 15,
        bottom: 10,
        left: 24,
        right: 8,
      },
      textAlign: 'center' as const,
    };
    const props = {
      text: 'Hello world!',
      level: 'h1' as const,
    };
    expect(render(<Heading style={style} props={props} />).asFragment()).toMatchSnapshot();
  });
});
