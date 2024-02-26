import React from 'react';

import { Button, Drawer, Stack } from '@mui/material';

import { useEditorState } from '../../documents/editor/EditorContext';

export const SAMPLES_DRAWER_WIDTH = 240;

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
      <Stack
        gap={2}
        py={1}
        px={2}
        width={SAMPLES_DRAWER_WIDTH}
        sx={{ '& .MuiButtonBase-root': { width: '100%', justifyContent: 'flex-start' } }}
      >
        <Button
          size="small"
          href="https://www.usewaypoint.com/open-source/emailbuilderjs"
          target="_blank"
          sx={{ fontSize: 16 }}
        >
          EmailBuilder.js
        </Button>
        <Stack alignItems="flex-start">
          <Button size="small" onClick={() => select('empty')}>
            Empty
          </Button>
          <Button size="small" onClick={() => select('one-time-password')}>
            One-time passcode (OTP)
          </Button>
          <Button size="small" onClick={() => select('reset-password')}>
            Reset password
          </Button>
          <Button size="small" onClick={() => select('order-ecomerce')}>
            E-commerce receipt
          </Button>
          <Button size="small" onClick={() => select('subscription-receipt')}>
            Subscription receipt
          </Button>
          <Button size="small" onClick={() => select('reservation-reminder')}>
            Reservation reminder
          </Button>
          <Button size="small" onClick={() => select('post-metrics-report')}>
            Post metrics
          </Button>
          <Button size="small" onClick={() => select('respond-to-message')}>
            Respond to message
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
