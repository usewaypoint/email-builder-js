import React from 'react';

import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import { Image } from '.';

describe('block-image', () => {
  it('renders with default values', () => {
    expect(render(<Image />).asFragment()).toMatchSnapshot();
  });
});
