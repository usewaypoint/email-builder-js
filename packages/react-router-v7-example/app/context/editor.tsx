import { create } from 'zustand';

import EMPTY_EMAIL_MESSAGE from '~/components/templates/empty-email-message';
import { type TEditorConfiguration } from '../documents/editor/core';

export type MainTabOptions = 'editor' | 'preview' | 'json' | 'html';
export const screenSizeOptions = ['desktop', 'mobile'] as const;
export type ScreenSizeOptions = (typeof screenSizeOptions)[number];

type TValue = {
  document: TEditorConfiguration;

  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles';
  selectedMainTab: MainTabOptions;
  selectedScreenSize: ScreenSizeOptions;

  inspectorSidebarOpen: boolean;
  templatesSidebarOpen: boolean;
};

const editorStateStore = create<TValue>(() => ({
  document: EMPTY_EMAIL_MESSAGE,

  selectedBlockId: null,
  selectedSidebarTab: 'styles',
  selectedMainTab: 'editor',
  selectedScreenSize: 'desktop',

  inspectorSidebarOpen: true,
  templatesSidebarOpen: true,
}));

export function useDocument() {
  return editorStateStore((s) => s.document);
}

export function useSelectedBlockId() {
  return editorStateStore((s) => s.selectedBlockId);
}

export function useSelectedScreenSize() {
  return editorStateStore((s) => s.selectedScreenSize);
}

export function useSelectedMainTab() {
  return editorStateStore((s) => s.selectedMainTab);
}

export function setSelectedMainTab(selectedMainTab: TValue['selectedMainTab']) {
  return editorStateStore.setState({ selectedMainTab });
}

export function useSelectedSidebarTab() {
  return editorStateStore((s) => s.selectedSidebarTab);
}

export function useInspectorSidebarOpen() {
  return editorStateStore((s) => s.inspectorSidebarOpen);
}

export function useTemplatesSidebarOpen() {
  return editorStateStore((s) => s.templatesSidebarOpen);
}

export function setSelectedBlockId(selectedBlockId: TValue['selectedBlockId']) {
  const selectedSidebarTab = selectedBlockId === null ? 'styles' : 'block-configuration';
  const options: Partial<TValue> = {};
  if (selectedBlockId !== null) {
    options.inspectorSidebarOpen = true;
  }
  return editorStateStore.setState({
    selectedBlockId,
    selectedSidebarTab,
    ...options,
  });
}

export function setSidebarTab(selectedSidebarTab: TValue['selectedSidebarTab']) {
  return editorStateStore.setState({ selectedSidebarTab });
}

export function resetDocument(document: TValue['document']) {
  return editorStateStore.setState({
    document,
    selectedSidebarTab: 'styles',
    selectedBlockId: null,
  });
}

export function setDocument(document: TValue['document']) {
  const originalDocument = editorStateStore.getState().document;
  return editorStateStore.setState({
    document: {
      ...originalDocument,
      ...document,
    },
  });
}

export function toggleInspectorSidebarOpen() {
  const inspectorSidebarOpen = !editorStateStore.getState().inspectorSidebarOpen;
  return editorStateStore.setState({ inspectorSidebarOpen });
}

export function toggleTemplatesSidebarOpen() {
  const templatesSidebarOpen = !editorStateStore.getState().templatesSidebarOpen;
  return editorStateStore.setState({ templatesSidebarOpen });
}

export function setSelectedScreenSize(selectedScreenSize: TValue['selectedScreenSize']) {
  return editorStateStore.setState({ selectedScreenSize });
}
