import React, { createContext, useContext, useMemo, useState } from 'react';

import { TEditorConfiguration } from './core';

type TValue = {
  document: TEditorConfiguration;

  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles';
  selectedMainTab: 'editor' | 'preview' | 'data' | 'html';

  inspectorDrawerOpen: boolean;
  samplesDrawerOpen: boolean;
};
type TEditorContextState = [state: TValue, setState: (v: Partial<TValue>) => void];

const DEFAULT_STATE: TValue = {
  document: {},
  selectedBlockId: null,
  selectedSidebarTab: 'styles',
  selectedMainTab: 'editor',

  inspectorDrawerOpen: true,
  samplesDrawerOpen: true,
};
const EditorContext = createContext<TEditorContextState>([DEFAULT_STATE, () => {}]);

export function useEditorState() {
  return useContext(EditorContext);
}

type EditorProviderProps = {
  defaultValue: TEditorConfiguration;
  children: Parameters<typeof EditorContext.Provider>[0]['children'];
};
export function EditorProvider({ defaultValue, children }: EditorProviderProps) {
  const [state, setState] = useState<TValue>(() => ({
    ...DEFAULT_STATE,
    document: defaultValue,
  }));
  const value = useMemo<TEditorContextState>(
    () => [
      state,
      (s: Partial<TValue>) => {
        setState({ ...state, ...s });
      },
    ],
    [state, setState]
  );
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
