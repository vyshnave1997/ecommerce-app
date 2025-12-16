'use client';

import React from 'react';
import { Card, Button, Row, Col, Tag, Divider, theme } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, MoreOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import OrderItemsList from './OrderItemsList';
import OrderTimeline from './OrderTimeline';

interface OrderDetailLayoutProps {
  orderId: string;
}

// Mock detailed order data
const getOrderDetail = (id: string) => ({
  id: id,
  products: 4,
  customer: 'Alex John',
  date: '13:45, Nov 10, 2025',
  status: 'On the way',
  deliveryDate: 'Fri, 13 Nov, 2025',
  address: 'Great street, New York Brooklyn 5A, PO: 212891',
  total: 340.00,
  subtotal: 320.00,
  shipping: 20.00,
  tax: 0.00,
  statusColor: 'orange',
  trackingNumber: 'TRK123456789',
  items: [
    {
      id: 1,
      name: 'Great product name goes here',
      quantity: 1,
      price: 340,
      color: 'Silver',
      size: 'Large',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Table lamp for office or bedroom',
      quantity: 1,
      price: 340,
      color: 'Silver',
      size: 'Large',
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Great product name goes here',
      quantity: 1,
      price: 340,
      color: 'Silver',
      size: 'Large',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'Great cup white minimalist style',
      quantity: 2,
      price: 90,
      color: 'White',
      image: '/api/placeholder/80/80'
    }
  ],
  timeline: [
    { title: 'Order Placed', date: 'Nov 10, 2025 - 13:45', status: 'finish' as const },
    { title: 'Processing', date: 'Nov 10, 2025 - 14:30', status: 'finish' as const },
    { title: 'Shipped', date: 'Nov 11, 2025 - 09:00', status: 'finish' as const },
    { title: 'Out for Delivery', date: 'Nov 13, 2025 - 08:00', status: 'process' as const },
    { title: 'Delivered', date: 'Expected: Nov 13, 2025', status: 'wait' as const }
  ]
});

const OrderDetailLayout: React.FC<OrderDetailLayoutProps> = ({ orderId }) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';
  
  const order = getOrderDetail(orderId);

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '24px'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          className={isDarkMode ? 'dark-mode-button' : 'light-mode-button'}
          style={{
            fontSize: '14px',
            fontWeight: 500,
            padding: '8px 12px',
            height: 'auto',
            backgroundColor: 'transparent',
            border: 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>Back to Orders</span>
        </Button>
        <style jsx>{`
          .dark-mode-button {
            color: #ffffff !important;
          }
          .dark-mode-button:hover {
            background-color: rgba(255, 255, 255, 0.08) !important;
            color: #5f63f2 !important;
          }
          .dark-mode-button :global(svg) {
            color: #ffffff !important;
          }
          .dark-mode-button :global(span) {
            color: #ffffff !important;
          }
          .dark-mode-button:hover :global(span) {
            color: #5f63f2 !important;
          }
          .light-mode-button {
            color: #000000 !important;
          }
          .light-mode-button:hover {
            background-color: rgba(0, 0, 0, 0.04) !important;
            color: #5f63f2 !important;
          }
          .light-mode-button :global(span) {
            color: #000000 !important;
          }
          .light-mode-button:hover :global(span) {
            color: #5f63f2 !important;
          }
        `}</style>
      </div>

      <Card
        style={{
          backgroundColor: token.colorBgContainer,
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
          marginBottom: '20px'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: token.colorTextHeading,
              marginBottom: '8px'
            }}>
              Order #: {order.id}
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: token.colorTextSecondary,
              margin: 0
            }}>
              {order.products} Products | By {order.customer} | {order.date}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              icon={<DownloadOutlined />}
              style={{
                borderRadius: '8px',
                border: `1px solid ${isDarkMode ? '#404040' : '#d9d9d9'}`,
              }}
            >
              Download invoice
            </Button>
            <Button
              icon={<MoreOutlined />}
              style={{
                borderRadius: '8px',
                border: `1px solid ${isDarkMode ? '#404040' : '#d9d9d9'}`,
              }}
            />
          </div>
        </div>

        <Divider style={{ margin: '20px 0' }} />

        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12} md={8}>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: token.colorTextSecondary }}>
              Status:
            </div>
            <Tag color={order.statusColor} style={{ fontSize: '14px' }}>{order.status}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: token.colorTextSecondary }}>
              Date of delivery:
            </div>
            <div style={{ fontSize: '14px', color: token.colorText, fontWeight: 500 }}>
              {order.deliveryDate}
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: token.colorTextSecondary }}>
              Tracking Number:
            </div>
            <div style={{ fontSize: '14px', color: token.colorText, fontWeight: 500 }}>
              {order.trackingNumber}
            </div>
          </Col>
        </Row>

        <Row gutter={[24, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} md={16}>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: token.colorTextSecondary }}>
              Delivered to:
            </div>
            <div style={{ fontSize: '14px', color: token.colorText, fontWeight: 500 }}>
              {order.address}
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card
            title="Order Items"
            style={{
              backgroundColor: token.colorBgContainer,
              borderRadius: '12px',
              border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
            }}
          >
            <OrderItemsList items={order.items} />
            
            <Divider style={{ margin: '20px 0' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>Subtotal:</span>
                <span style={{ fontSize: '14px', color: token.colorText, fontWeight: 500 }}>
                  USD {order.subtotal.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>Shipping:</span>
                <span style={{ fontSize: '14px', color: token.colorText, fontWeight: 500 }}>
                  USD {order.shipping.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: token.colorTextSecondary }}>Tax:</span>
                <span style={{ fontSize: '14px', color: token.colorText, fontWeight: 500 }}>
                  USD {order.tax.toFixed(2)}
                </span>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '16px', color: token.colorText, fontWeight: 600 }}>Total:</span>
                <span style={{ fontSize: '16px', color: '#5f63f2', fontWeight: 700 }}>
                  USD {order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <OrderTimeline timeline={order.timeline} />
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailLayout;