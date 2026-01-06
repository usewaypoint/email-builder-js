/**
 * @jest-environment node
 */

import { describe, expect, it } from '@jest/globals';

import renderToStaticMarkup from './renderToStaticMarkup';

describe('renderToStaticMarkup', () => {
  it('renders into a string', () => {
    const result = renderToStaticMarkup(
      {
        root: {
          type: 'Container',
          data: {
            props: {
              childrenIds: [],
            },
          },
        },
      },
      { rootBlockId: 'root' }
    );
    expect(result).toEqual('<!DOCTYPE html><html><body><div></div></body></html>');
  });
});
