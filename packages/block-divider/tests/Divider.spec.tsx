import React from 'react';

import { render } from '@testing-library/react';

import { Divider } from '../src';

describe('Divider', () => {
  it('renders with default values', () => {
    expect(render(<Divider style={{}} props={{}} />).asFragment()).toMatchSnapshot();
  });

  it('renders with props', () => {
    expect(
      render(
        <Divider
          style={{
            padding: { top: 1, left: 2, bottom: 3, right: 4 },
            backgroundColor: '#fff000',
          }}
          props={{ lineColor: '#444222', lineHeight: 10 }}
        />
      ).asFragment()
    ).toMatchSnapshot();
  });
});
