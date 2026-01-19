import { useMemo } from 'react';
import { useDocument } from '~/context/editor';

export function useDownloadUrl() {
  const doc = useDocument();
  const href = useMemo(() => {
    return `data:text/plain,${encodeURIComponent(JSON.stringify(doc, null, '  '))}`;
  }, [doc]);
  return href;
}
