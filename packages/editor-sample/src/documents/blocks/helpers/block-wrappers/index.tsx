import React from 'react';

import EditorBlockWrapper from './EditorBlockWrapper';
import ReaderBlockWrapper from './ReaderBlockWrapper';

type TCommonProps = {
  props: Record<string, unknown>;
  style: Record<string, unknown>;
};

export function addReaderBlockWrapper<TProps extends TCommonProps>(ChildComponent: (props: TProps) => JSX.Element) {
  return (props: TProps) => {
    return (
      <ReaderBlockWrapper style={props.style}>
        <ChildComponent {...props} />
      </ReaderBlockWrapper>
    );
  };
}

export function addEditorBlockWrapper<TProps extends TCommonProps>(ChildComponent: (props: TProps) => JSX.Element) {
  return (props: TProps) => {
    return (
      <EditorBlockWrapper>
        <ReaderBlockWrapper style={props.style}>
          <ChildComponent {...props} />
        </ReaderBlockWrapper>
      </EditorBlockWrapper>
    );
  };
}
