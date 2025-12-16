'use client';

import React from 'react';
import { Space, theme, Image } from 'antd';
import OrderCard from './OrderCard';

interface OrderListProps {
  orders: any[];
  selectedTab: string;
}

const OrderList: React.FC<OrderListProps> = ({ orders, selectedTab }) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  if (orders.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '48px 24px',
        backgroundColor: token.colorBgContainer,
        border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
        borderRadius: '12px',
        transition: 'all 0.3s ease',
      }}>
        <p style={{ 
          fontSize: '16px',
          color: token.colorTextSecondary,
          margin: 0,
          transition: 'color 0.3s ease',
        }}>
          No {selectedTab} orders found
        </p>
      </div>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Space>
  );
};

export default OrderList;

