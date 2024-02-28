import React from 'react';

import { render } from '@testing-library/react';

import { Container } from '.';

describe('block-container', () => {
  it('renders with default values', () => {
    expect(render(<Container />).asFragment()).toMatchSnapshot();
  });
});
