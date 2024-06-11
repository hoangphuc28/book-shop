'use client'
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Button, Typography } from '@mui/material';
import { Fragment } from 'react';
import { OrderStatus } from '../../../../utils/interfaces/enum';
import { Order } from '../../../../utils/interfaces/order';
import formatter from "../../../../utils/timeFormat";
import { updateOrderStatus as updateOrderStatusMutation } from '../../../../utils/api/graphQL/query';
import { useMutation } from '@apollo/client';


interface OrderDetailProps {
  order: Order;
}



export default function TimeLine({ order }: OrderDetailProps) {
  const [updateOrderStatusMutate] = useMutation(updateOrderStatusMutation);

  const timelineEvents = {
    [OrderStatus.PENDING]: [
      { status: 'Order placed', date: order?.createdAt?.toString()},
    ],
    [OrderStatus.DELIVERING]: [
      { status: 'Order placed', date: order?.createdAt?.toString()},
      // { status: 'Payment accepted', date: '2023-11-19T10:47:00', details: 'VISA Credit Card' },
      { status: 'Products are delivering to the courier', date: order?.deliveringDate?.toString()},
    ],
    [OrderStatus.DELIVERED]: [
      { status: 'Order placed', date: order?.createdAt?.toString()},
      // { status: 'Payment accepted', date: '2023-11-19T10:47:00', details: 'VISA Credit Card' },
      { status: 'Products are delivering to the courier', date: order?.deliveringDate?.toString()},
      { status: 'Products delivered', date: order?.deliveredDate?.toString(), details: '' },
    ],
    [OrderStatus.CANCELLED]: [
      { status: 'Order placed', date: order?.createdAt?.toString()},
      { status: 'Order cancelled', date: order?.cancelledDate?.toString(), details: 'Due to stock issues' },
    ],
    [OrderStatus.CANCEL_PENDING]: [
      { status: 'Order placed', date: order?.createdAt?.toString()},

      { status: 'Cancellation pending', date: order?.cancelePendingDate?.toString(), details: 'Waiting for approval' },
    ],
    [OrderStatus.REJECTED]: [
      { status: 'Order placed', date: order?.createdAt?.toString()},

      { status: 'Cancellation pending', date: order?.cancelePendingDate?.toString(), details: 'Waiting for approval' },
    ],
  };
  const events = timelineEvents[order?.status];
  const currentDate = new Date();
  const cancelSubmit = async () => {
    try {
      const res = await updateOrderStatusMutate({
        variables: {
          orderId: order.orderID,
          orderStatus: OrderStatus.CANCEL_PENDING
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
      alert('Error')
    }
  }

  return (
    <Fragment>
      <Typography variant="h6" className="mb-4">
        Order Tracking
      </Typography>
      <Typography variant="body1" className="mb-4">Estimated delivery in 24 Nov 2023</Typography>
      <Timeline className="custom-timeline">
        {events?.map((event, index) => {
          const eventDate = new Date(event.date);
          const isPastEvent = eventDate <= currentDate;
          return (
            <TimelineItem key={index} className="custom-timeline-item">
              <TimelineSeparator>
                <TimelineDot color={isPastEvent ? "primary" : "grey"} />
                {index < events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body1" color={isPastEvent ? "textPrimary" : "textSecondary"}>{event.status}</Typography>
                <Typography variant="caption" color={isPastEvent ? "textPrimary" : "textSecondary"}>
                  {event.date}
                </Typography>
                {/* <Typography variant="caption" color={isPastEvent ? "textPrimary" : "textSecondary"}>
                  {event.details}
                </Typography> */}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
     {order?.status === OrderStatus.PENDING &&
      <Box className="flex justify-between items-center">
      <Button onClick={cancelSubmit} variant="outlined" color='error' className="mt-2 w-full">
        Cancel the order
      </Button>
    </Box>
     }
    </Fragment>
  );
}
