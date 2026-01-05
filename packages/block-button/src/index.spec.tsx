import React from 'react';

import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import { Button } from '.';

describe('block-button', () => {
  it('renders with default values', () => {
    expect(render(<Button />).asFragment()).toMatchSnapshot();
  });
});
