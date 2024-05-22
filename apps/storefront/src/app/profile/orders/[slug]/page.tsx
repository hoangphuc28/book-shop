import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import TimeLine from './timeLine';
import OrderDetail from './orderDetail';

export default function OrderTrackingPage() {


  return (
    <div className="col-span-9 space-y-4">

      <div className="flex text-slate-950">
        <Box className="w-8/12 p-4">

          <OrderDetail />
        </Box>
        <Box className="w-4/12 p-4 border-solid border-l-2" >
          <TimeLine />
          <Box className="flex justify-between items-center">
          <Button variant="outlined" color='error' className="mt-2 w-full">
            Cancel the order
          </Button>
        </Box>
        </Box>
      </div>
    </div>
  );
};


