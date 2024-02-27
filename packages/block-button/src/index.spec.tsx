import React from 'react';

import { render } from '@testing-library/react';

import { Button } from '.';

describe('block-button', () => {
  it('renders with default values', () => {
    expect(render(<Button />).asFragment()).toMatchSnapshot();
  });
});
