'use client';

import React from 'react';
import { Button, Typography, Space, Tag, theme, Collapse } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, MoreOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import PublicLayout from '../../components/PublicLayout';

const { Title, Text } = Typography;

// Mock order data - In real app, this would come from API/database
const orderDetails: any = {
  '73262': {
    id: 73262,
    products: 4,
    createdBy: 'Alex John',
    createdAt: '13:45, Nov 10, 2025',
    status: 'On the way',
    deliveryDate: 'Fri, 13 Nov, 2025',
    deliveredTo: 'Great street, New York Brooklyn SA, PO: 212891',
    total: 340.00,
    statusColor: 'orange',
    items: [
      { name: 'Great product name goes here', quantity: 1, price: 340, color: 'Silver', size: 'Large', image: '🔵' },
      { name: 'Table lamp for office or bedroom', quantity: 1, price: 340, color: 'Silver', size: 'Large', image: '☕' },
      { name: 'Great product name goes here', quantity: 1, price: 340, color: 'Silver', size: 'Large', image: '💡' },
      { name: 'Great cup white minimalist style', quantity: 2, price: 90, color: 'White', size: '', image: '🔷' }
    ]
  },
  '73261': {
    id: 73261,
    products: 3,
    createdBy: 'Sarah Miller',
    createdAt: '10:30, Nov 09, 2025',
    status: 'Processing',
    deliveryDate: 'Mon, 16 Nov, 2025',
    deliveredTo: 'Main avenue, Brooklyn NY, PO: 112234',
    total: 520.00,
    statusColor: 'blue',
    items: [
      { name: 'Premium headphones', quantity: 1, price: 299, color: 'Black', size: '', image: '🎧' },
      { name: 'Wireless keyboard', quantity: 1, price: 149, color: 'White', size: '', image: '⌨️' },
      { name: 'Mouse pad XL', quantity: 2, price: 36, color: 'Gray', size: 'Large', image: '🖱️' }
    ]
  },
  '73260': {
    id: 73260,
    products: 2,
    createdBy: 'Mike Johnson',
    createdAt: '15:20, Nov 08, 2025',
    status: 'Pending Payment',
    deliveryDate: 'Wed, 18 Nov, 2025',
    deliveredTo: 'Park street, Manhattan NY, PO: 100456',
    total: 180.00,
    statusColor: 'red',
    items: [
      { name: 'Coffee maker deluxe', quantity: 1, price: 120, color: 'Silver', size: '', image: '☕' },
      { name: 'Coffee beans premium', quantity: 2, price: 30, color: '', size: '', image: '☕' }
    ]
  },
  '73259': {
    id: 73259,
    products: 5,
    createdBy: 'Emma Davis',
    createdAt: '09:15, Nov 05, 2025',
    status: 'Delivered',
    deliveryDate: 'Sat, 07 Nov, 2025',
    deliveredTo: 'Ocean drive, Queens NY, PO: 114567',
    total: 890.00,
    statusColor: 'green',
    items: [
      { name: 'Desk chair ergonomic', quantity: 1, price: 450, color: 'Black', size: '', image: '🪑' },
      { name: 'Standing desk', quantity: 1, price: 350, color: 'Oak', size: 'Large', image: '🪑' },
      { name: 'Monitor stand', quantity: 2, price: 45, color: 'Silver', size: '', image: '📱' }
    ]
  },
  '73258': {
    id: 73258,
    products: 6,
    createdBy: 'David Brown',
    createdAt: '14:50, Nov 03, 2025',
    status: 'Delivered',
    deliveryDate: 'Thu, 05 Nov, 2025',
    deliveredTo: 'Sunset blvd, Brooklyn NY, PO: 112789',
    total: 1240.00,
    statusColor: 'green',
    items: [
      { name: 'Smart TV 55 inch', quantity: 1, price: 799, color: 'Black', size: '', image: '📺' },
      { name: 'Soundbar premium', quantity: 1, price: 299, color: 'Black', size: '', image: '🔊' },
      { name: 'HDMI cable 4K', quantity: 3, price: 15, color: 'Black', size: '', image: '🔌' },
      { name: 'Wall mount kit', quantity: 1, price: 89, color: 'Silver', size: '', image: '🔧' }
    ]
  }
};

const OrderDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';
  
  const orderId = params?.id as string;
  const order = orderDetails[orderId];

  if (!order) {
    return (
      <PublicLayout>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '24px',
          textAlign: 'center',
          backgroundColor: token.colorBgContainer,
          border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
          borderRadius: '12px',
          transition: 'all 0.3s ease',
        }}>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: token.colorTextHeading,
              margin: '0 0 16px 0',
              transition: 'color 0.3s ease',
            }}
          >
            Order not found
          </h3>
          <Button 
            type="primary" 
            onClick={() => router.push('/orders')}
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              backgroundColor: '#5f63f2',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4a4ed8';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(95, 99, 242, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#5f63f2';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Back to Orders
          </Button>
        </div>
      </PublicLayout>
    );
  }

  const collapseItems = [
    {
      key: '1',
      label: (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          width: '100%',
          padding: '8px 0'
        }}>
          <div>
            <Space direction="vertical" size={4}>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: token.colorTextHeading,
                  margin: 0,
                  transition: 'color 0.3s ease',
                }}
              >
                Order #: {order.id}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: token.colorTextSecondary,
                  margin: 0,
                  transition: 'color 0.3s ease',
                }}
              >
                {order.products} Products | By {order.createdBy} | {order.createdAt}
              </p>
            </Space>
          </div>
          <Space size="small">
            <Button 
              icon={<DownloadOutlined />} 
              style={{ 
                fontSize: '13px',
                height: '40px',
                borderRadius: '8px',
                fontWeight: 500,
                backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#404040' : '#d9d9d9'}`,
                color: token.colorText,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Download invoice
            </Button>
            <Button 
              icon={<MoreOutlined />} 
              type="text"
              style={{ 
                height: '32px', 
                width: '32px', 
                padding: 0,
                color: token.colorText,
                transition: 'color 0.3s ease',
              }}
            />
          </Space>
        </div>
      ),
      children: (
        <div style={{ marginTop: '16px' }}>
          <Space direction="vertical" size={16} style={{ width: '100%', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '48px' }}>
              <div>
                <p
                  style={{
                    fontSize: '13px',
                    color: token.colorTextSecondary,
                    margin: '0 0 4px 0',
                    transition: 'color 0.3s ease',
                  }}
                >
                  Status:
                </p>
                <div style={{ marginTop: '4px' }}>
                  <Tag color={order.statusColor}>{order.status}</Tag>
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '13px',
                    color: token.colorTextSecondary,
                    margin: '0 0 4px 0',
                    transition: 'color 0.3s ease',
                  }}
                >
                  Date of delivery:
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: token.colorText,
                    margin: 0,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {order.deliveryDate}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '48px' }}>
              <div>
                <p
                  style={{
                    fontSize: '13px',
                    color: token.colorTextSecondary,
                    margin: '0 0 4px 0',
                    transition: 'color 0.3s ease',
                  }}
                >
                  Delivered to:
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: token.colorText,
                    margin: 0,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {order.deliveredTo}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '13px',
                    color: token.colorTextSecondary,
                    margin: '0 0 4px 0',
                    transition: 'color 0.3s ease',
                  }}
                >
                  Total:
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: token.colorText,
                    margin: 0,
                    transition: 'color 0.3s ease',
                  }}
                >
                  USD {order.total.toFixed(2)}
                </p>
              </div>
            </div>
          </Space>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '16px',
            marginTop: '24px'
          }}>
            {order.items.map((item: any, idx: number) => (
              <div 
                key={idx}
                style={{ 
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.04)' : '#f5f5f5',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e8e8e8',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  flexShrink: 0
                }}>
                  {item.image}
                </div>
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: token.colorTextHeading,
                      margin: '0 0 8px 0',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.name}
                  </h4>
                  <Space direction="vertical" size={2}>
                    <p
                      style={{
                        fontSize: '13px',
                        color: token.colorTextSecondary,
                        margin: 0,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      Quantity: {item.quantity}x = USD {item.price}
                    </p>
                    {item.color && (
                      <p
                        style={{
                          fontSize: '13px',
                          color: token.colorTextSecondary,
                          margin: 0,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        Color: {item.color}
                      </p>
                    )}
                    {item.size && (
                      <p
                        style={{
                          fontSize: '13px',
                          color: token.colorTextSecondary,
                          margin: 0,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        Size: {item.size}
                      </p>
                    )}
                  </Space>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <PublicLayout>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '24px'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push('/orders')}
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

        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: token.colorTextHeading,
            margin: '0 0 24px 0',
            transition: 'color 0.3s ease',
          }}
        >
          Order Details
        </h2>

        <Collapse
          items={collapseItems}
          defaultActiveKey={['1']}
          style={{
            backgroundColor: token.colorBgContainer,
            border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
            borderRadius: '12px',
            transition: 'all 0.3s ease',
          }}
        />
      </div>
    </PublicLayout>
  );
};

export default OrderDetailPage;