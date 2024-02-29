import React from 'react';

import { Button } from '@mui/material';

export default function SidebarButton({ href, children }: { href: string; children: JSX.Element | string }) {
  return (
    <Button size="small" href={href}>
      {children}
    </Button>
  );
}
