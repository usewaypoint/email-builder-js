import { create } from 'zustand';

import getConfiguration from '../../getConfiguration';

import { TEditorConfiguration } from './core';

type TValue = {
  document: TEditorConfiguration;

  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles';
  selectedMainTab: 'editor' | 'preview' | 'data' | 'html';
  selectedScreenSize: 'desktop' | 'mobile';

  inspectorDrawerOpen: boolean;
  samplesDrawerOpen: boolean;
};

const useEditorState = create<TValue>(() => ({
  document: getConfiguration(window.location.hash),
  selectedBlockId: null,
  selectedSidebarTab: 'styles',
  selectedMainTab: 'editor',
  selectedScreenSize: 'desktop',

  inspectorDrawerOpen: true,
  samplesDrawerOpen: true,
}));

export function useDocument() {
  return useEditorState((s) => s.document);
}

export function useSelectedBlockId() {
  return useEditorState((s) => s.selectedBlockId);
}

export function useSelectedScreenSize() {
  return useEditorState((s) => s.selectedScreenSize);
}

export function useSelectedMainTab() {
  return useEditorState((s) => s.selectedMainTab);
}

export function useSelectedSidebarTab() {
  return useEditorState((s) => s.selectedSidebarTab);
}

export function useInspectorDrawerOpen() {
  return useEditorState((s) => s.inspectorDrawerOpen);
}

export function useSamplesDrawerOpen() {
  return useEditorState((s) => s.samplesDrawerOpen);
}

export function setEditorState(state: Partial<TValue>) {
  useEditorState.setState({ ...state });
}
