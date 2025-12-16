'use client';

import React from 'react';
import { Row, Col, theme } from 'antd';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  color: string;
  size?: string;
  image: string;
}

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col key={item.id} xs={24}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                borderRadius: '8px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#e8e8e8',
                borderRadius: '4px'
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: token.colorTextHeading,
                marginBottom: '6px',
                lineHeight: '1.4'
              }}>
                {item.name}
              </h4>
              <p style={{
                fontSize: '13px',
                color: token.colorTextSecondary,
                margin: 0
              }}>
                Quantity: {item.quantity}x = USD {item.price}
              </p>
              <p style={{
                fontSize: '13px',
                color: token.colorTextSecondary,
                margin: 0
              }}>
                Color: {item.color}
                {item.size && ` | Size: ${item.size}`}
              </p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default OrderItemsList;