'use client';

import React from 'react';
import { Card, theme } from 'antd';

const Payments: React.FC = () => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  return (
    <Card style={{
      backgroundColor: token.colorBgContainer,
      borderRadius: '12px',
      border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: token.colorTextHeading, marginBottom: '8px' }}>
        Payments
      </h3>
      <p style={{ color: token.colorTextSecondary, margin: 0 }}>
        Manage your payment methods
      </p>
    </Card>
  );
};

export default Payments;