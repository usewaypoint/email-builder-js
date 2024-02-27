import React from 'react';

import { render } from '@testing-library/react';

import { Html } from '.';

describe('block-html', () => {
  it('renders with default values', () => {
    expect(render(<Html />).asFragment()).toMatchSnapshot();
  });
});
