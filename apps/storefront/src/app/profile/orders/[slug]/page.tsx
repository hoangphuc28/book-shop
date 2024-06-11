'use client'
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import TimeLine from './timeLine';
import OrderDetail from './orderDetail';
import { getDetailOrder } from '../../../../utils/api/graphQL/query';
import { useQuery } from '@apollo/client';
import { Order } from '../../../../utils/interfaces/order';

export default function OrderTrackingPage({ params }: { params: { slug: string } }) {
  console.log(params?.slug)
  const {data} = useQuery(getDetailOrder, {
    variables: {
      orderId: params.slug
    }
  })
  const orderDetail = data?.getDetailOrder as Order
  console.log(data)
  return (
    <div className="col-span-9 space-y-4">

      <div className="flex text-slate-950">
        <Box className="w-8/12 p-4">

          <OrderDetail orderDetail={orderDetail} />
        </Box>
        <Box className="w-4/12 p-4 border-solid border-l-2" >
          <TimeLine order={orderDetail}/>

        </Box>
      </div>
    </div>
  )
}


