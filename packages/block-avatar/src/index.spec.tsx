import React from 'react';

import { render } from '@testing-library/react';

import { Avatar } from '.';

describe('block-avatar', () => {
  describe('Avatar', () => {
    it('renders with default values', () => {
      expect(render(<Avatar />).asFragment()).toMatchSnapshot();
    });
  });
});
