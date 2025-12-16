'use client';

import React from 'react';
import { Card, Steps, theme } from 'antd';

interface TimelineItem {
  title: string;
  date: string;
  status: 'wait' | 'process' | 'finish' | 'error';
}

interface OrderTimelineProps {
  timeline: TimelineItem[];
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ timeline }) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  return (
    <Card
      title="Order Timeline"
      style={{
        backgroundColor: token.colorBgContainer,
        borderRadius: '12px',
        border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
      }}
    >
      <Steps
        direction="vertical"
        current={timeline.findIndex(item => item.status === 'process')}
        items={timeline.map(item => ({
          title: item.title,
          description: item.date,
          status: item.status
        }))}
      />
    </Card>
  );
};

export default OrderTimeline;