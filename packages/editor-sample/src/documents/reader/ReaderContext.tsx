import React, { createContext, useContext } from 'react';

import { TReaderDocument } from './core';

const ReaderContext = createContext<TReaderDocument>({});

export function useReaderDocument() {
  return useContext(ReaderContext);
}

type ReaderProviderProps = {
  value: TReaderDocument;
  children: Parameters<typeof ReaderContext.Provider>[0]['children'];
};
export function ReaderProvider({ value, children }: ReaderProviderProps) {
  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>;
}
