import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Button, Typography } from '@mui/material';
import { Fragment } from 'react';
const timelineEvents = [
    { status: 'Order placed', date: '19 Nov 2023, 10:45', details: 'Receipt #647563' },
    { status: 'Payment accepted', date: '19 Nov 2023, 10:47', details: 'VISA Credit Card' },
    { status: 'Products delivered to the courier', date: '22 Nov 2023, 12:27', details: 'DHL Express' },
    { status: 'Products in the courier\'s warehouse', date: '23 Nov 2023, 15:15', details: '' },
    { status: 'Products being delivered', date: 'Today', details: '' },
  ];
export default function TimeLine() {
  return (
    <Fragment>
    <Typography variant="h6" className="mb-4">
      Order Tracking
    </Typography>
    <Typography variant="body1" className="mb-4">Estimated delivery in 24 Nov 2023</Typography>
    <Timeline className="custom-timeline">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index} className="custom-timeline-item">
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < timelineEvents.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body1">{event.status}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {event.date}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {event.details}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
   </Fragment>
  );
}
