import React from 'react';

import { Button } from '@mui/material';

export default function SamplesPanel() {
  const select = (val: string) => {
    window.location.hash = `#sample/${val}`;
  };

  return (
    <>
      <Button onClick={() => select('one-time-password')}>one-time-password</Button>
      <Button onClick={() => select('order-ecomerce')}>order-ecomerce</Button>
      <Button onClick={() => select('post-metrics-report')}>post-metrics-report</Button>
      <Button onClick={() => select('reservation-reminder')}>reservation-reminder</Button>
      <Button onClick={() => select('reset-password')}>reset-password</Button>
      <Button onClick={() => select('respond-to-message')}>respond-to-message</Button>
      <Button onClick={() => select('subscription-receipt')}>subscription-receipt</Button>
    </>
  );
}
