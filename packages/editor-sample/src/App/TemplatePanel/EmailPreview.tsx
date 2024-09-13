import React, { useMemo } from 'react';
import { useEffect, useRef } from 'react';
import { useImages } from '../../documents/editor/EditorContext';

interface EmailPreviewProps {
  html: string;
}

export const EmailPreview = ({ html }: EmailPreviewProps) => {
  const images = useImages();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const content = useMemo(() => {
    let copy = html;
    images.forEach((image) => {
      copy = copy.replaceAll(image.file.name, image.base64);
    })
    return copy
  }, [images]);

  useEffect(() => {
    if (iframeRef.current && content) {
      const newChild = new DOMParser().parseFromString(content, 'text/html');
      iframeRef.current?.contentDocument?.replaceChild(
        newChild.documentElement,
        iframeRef.current.contentDocument.documentElement
      );
    }
  }, [iframeRef.current, content]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: '100%',
        height: '100%',
      }}
      title="Email preview"
    />
  );
};
