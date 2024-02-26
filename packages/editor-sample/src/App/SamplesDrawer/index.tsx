import React from 'react';

import { Box, Button, Drawer } from '@mui/material';

import { useEditorState } from '../../documents/editor/EditorContext';

export const SAMPLES_DRAWER_WIDTH = 400;

export default function SamplesDrawer() {
  const [{ samplesDrawerOpen }] = useEditorState();

  const select = (val: string) => {
    window.location.hash = `#sample/${val}`;
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={samplesDrawerOpen}
      sx={{
        width: samplesDrawerOpen ? SAMPLES_DRAWER_WIDTH : 0,
      }}
    >
      <Box width={SAMPLES_DRAWER_WIDTH}>
        <Button onClick={() => select('one-time-password')}>one-time-password</Button>
        <Button onClick={() => select('order-ecomerce')}>order-ecomerce</Button>
        <Button onClick={() => select('post-metrics-report')}>post-metrics-report</Button>
        <Button onClick={() => select('reservation-reminder')}>reservation-reminder</Button>
        <Button onClick={() => select('reset-password')}>reset-password</Button>
        <Button onClick={() => select('respond-to-message')}>respond-to-message</Button>
        <Button onClick={() => select('subscription-receipt')}>subscription-receipt</Button>
      </Box>
    </Drawer>
  );
}
