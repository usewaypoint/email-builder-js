import { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { useDocument } from '~/context/editor';

export function SaveButton() {
  const document = useDocument();
  const code = useMemo(() => JSON.stringify(document, null, '  '), [document]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        console.log('Document saved:', code);
        alert('Document saved! Check console for JSON output.');
      }}
    >
      SAVE
    </Button>
  );
}
