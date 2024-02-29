import React from 'react';

import { Box, Button, Drawer, Link, Stack, Typography } from '@mui/material';

import { useSamplesDrawerOpen } from '../../documents/editor/EditorContext';

import logo from './waypoint.svg';

export const SAMPLES_DRAWER_WIDTH = 240;

export default function SamplesDrawer() {
  const samplesDrawerOpen = useSamplesDrawerOpen();

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
      <Stack spacing={3} py={1} px={2} width={SAMPLES_DRAWER_WIDTH} justifyContent="space-between" height="100%">
        <Stack spacing={2} sx={{ '& .MuiButtonBase-root': { width: '100%', justifyContent: 'flex-start' } }}>
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
        <Stack spacing={2} px={0.75} py={3}>
          <Link href="https://usewaypoint.com?utm_source=emailbuilderjs" target="_blank" sx={{ lineHeight: 1 }}>
            <Box component="img" src={logo} width={32} />
          </Link>
          <Box>
            <Typography variant="overline" gutterBottom>
              Pro builder
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Looking for more? Waypoint is an email API with a hosted &apos;pro&apos; template builder with dynamic
              variables, loops, conditionals, drag and drop, layouts, and more.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ justifyContent: 'center' }}
            href="https://usewaypoint.com?utm_source=emailbuilderjs"
            target="_blank"
          >
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
