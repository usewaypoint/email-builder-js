import React from 'react';

import { Button, Menu, MenuItem } from '@mui/material';

export default function ExamplesButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const select = (val: string) => {
    window.location.hash = `#sample/${val}`;
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Samples</Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => select('one-time-password')}>one-time-password</MenuItem>
        <MenuItem onClick={() => select('order-ecomerce')}>order-ecomerce</MenuItem>
        <MenuItem onClick={() => select('post-metrics-report')}>post-metrics-report</MenuItem>
        <MenuItem onClick={() => select('reservation-reminder')}>reservation-reminder</MenuItem>
        <MenuItem onClick={() => select('reset-password')}>reset-password</MenuItem>
        <MenuItem onClick={() => select('respond-to-message')}>respond-to-message</MenuItem>
        <MenuItem onClick={() => select('subscription-receipt')}>subscription-receipt</MenuItem>
      </Menu>
    </>
  );
}
