import React from 'react';

import { BaseZodDictionary, BlockConfiguration, DocumentBlocksDictionary } from '../utils';

/**
 * @param blocks Main DocumentBlocksDictionary
 * @returns React component that can render a BlockConfiguration that is compatible with blocks
 */
export default function buildBlockComponent<T extends BaseZodDictionary>(blocks: DocumentBlocksDictionary<T>) {
  return function BlockComponent({ type, data }: BlockConfiguration<T>): React.ReactNode {
    return React.createElement(blocks[type].Component, data);
  };
}
