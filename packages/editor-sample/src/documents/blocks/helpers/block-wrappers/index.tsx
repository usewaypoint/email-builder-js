import React from 'react';

import { TStyle } from '../../../App/sidebar/ConfigurationPanel/input-panels/helpers/style-inputs/SingleStylePropertyPanel';

import EditorBlockWrapper from './EditorBlockWrapper';
import ReaderBlockWrapper from './ReaderBlockWrapper';

type TCommonProps = {
  props: Record<string, unknown>;
  style: TStyle;
};

export function addReaderBlockWrapper<TProps extends TCommonProps>(ChildComponent: (props: TProps) => React.ReactNode) {
  return (props: TProps) => {
    return (
      <ReaderBlockWrapper style={props.style}>
        <ChildComponent {...props} />
      </ReaderBlockWrapper>
    );
  };
}

export function addEditorBlockWrapper<TProps extends TCommonProps>(ChildComponent: (props: TProps) => React.ReactNode) {
  return (props: TProps) => {
    return (
      <EditorBlockWrapper style={props.style}>
        <ChildComponent {...props} />
      </EditorBlockWrapper>
    );
  };
}
