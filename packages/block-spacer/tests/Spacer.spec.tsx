import React from 'react';

import { render } from '@testing-library/react';

import { Spacer } from '../src';

describe('Spacer', () => {
  it('renders with default values', () => {
    expect(render(<Spacer props={{}} />).asFragment()).toMatchSnapshot();
  });

  it('renders with props', () => {
    expect(render(<Spacer props={{ height: 10 }} />).asFragment()).toMatchSnapshot();
  });
});
