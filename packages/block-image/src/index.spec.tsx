import React from 'react';

import { render } from '@testing-library/react';

import { Image } from '.';

describe('block-image', () => {
  it('renders with default values', () => {
    expect(render(<Image />).asFragment()).toMatchSnapshot();
  });
});
