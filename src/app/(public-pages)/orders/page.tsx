'use client';

import React, { useState } from 'react';
import { Button, Card, Typography, Space, Tag, Menu, theme } from 'antd';
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import PublicLayout from '../components/PublicLayout';

const { Title, Text } = Typography;

// Mock order data
const orderData = [
  {
    id: 73262,
    products: 4,
    createdBy: 'Alex John',
    createdAt: '13:45, Nov 10, 2025',
    status: 'On the way',
    deliveryDate: 'Fri, 13 Nov, 2025',
    deliveredTo: 'Great street, New York Brooklyn SA, PO: 212891',
    total: 340.00,
    statusColor: 'orange',
    category: 'current',
    productImages: ['🔵', '☕', '💡', '🔷']
  },
  {
    id: 73261,
    products: 3,
    createdBy: 'Sarah Miller',
    createdAt: '10:30, Nov 09, 2025',
    status: 'Processing',
    deliveryDate: 'Mon, 16 Nov, 2025',
    deliveredTo: 'Main avenue, Brooklyn NY, PO: 112234',
    total: 520.00,
    statusColor: 'blue',
    category: 'current',
    productImages: ['🎧', '⌨️', '🖱️']
  },
  {
    id: 73260,
    products: 2,
    createdBy: 'Mike Johnson',
    createdAt: '15:20, Nov 08, 2025',
    status: 'Pending Payment',
    deliveryDate: 'Wed, 18 Nov, 2025',
    deliveredTo: 'Park street, Manhattan NY, PO: 100456',
    total: 180.00,
    statusColor: 'red',
    category: 'unpaid',
    productImages: ['☕', '☕']
  },
  {
    id: 73259,
    products: 5,
    createdBy: 'Emma Davis',
    createdAt: '09:15, Nov 05, 2025',
    status: 'Delivered',
    deliveryDate: 'Sat, 07 Nov, 2025',
    deliveredTo: 'Ocean drive, Queens NY, PO: 114567',
    total: 890.00,
    statusColor: 'green',
    category: 'completed',
    productImages: ['🪑', '🪑', '📱']
  },
  {
    id: 73258,
    products: 6,
    createdBy: 'David Brown',
    createdAt: '14:50, Nov 03, 2025',
    status: 'Delivered',
    deliveryDate: 'Thu, 05 Nov, 2025',
    deliveredTo: 'Sunset blvd, Brooklyn NY, PO: 112789',
    total: 1240.00,
    statusColor: 'green',
    category: 'completed',
    productImages: ['📺', '🔊', '🔌', '🔧']
  }
];

const OrdersPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('current');
  const router = useRouter();
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  const filteredOrders = selectedTab === 'all' 
    ? orderData 
    : orderData.filter(order => order.category === selectedTab);

  const menuItems = [
    { key: 'current', label: 'Current' },
    { key: 'unpaid', label: 'Unpaid' },
    { key: 'completed', label: 'Completed' },
    { key: 'all', label: 'All orders' }
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
            <span>Back to Dashboard</span>
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
          Orders
        </h2>

        <Menu
          mode="horizontal"
          selectedKeys={[selectedTab]}
          items={menuItems}
          onClick={({ key }) => setSelectedTab(key)}
          style={{ 
            marginBottom: '24px',
            borderBottom: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease',
          }}
        />

        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              style={{
                backgroundColor: token.colorBgContainer,
                border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start'
              }}>
                <div style={{ flex: 1 }}>
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <div>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: token.colorTextHeading,
                          margin: '0 0 4px 0',
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
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      marginTop: '4px',
                      marginBottom: '4px'
                    }}>
                      {order.productImages.slice(0, 4).map((image, idx) => (
                        <div 
                          key={idx}
                          style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#f0f0f0',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            transition: 'all 0.3s ease',
                            border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
                          }}
                        >
                          {image}
                        </div>
                      ))}
                      {order.products > 4 && (
                        <div 
                          style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: isDarkMode ? 'rgba(95, 99, 242, 0.1)' : 'rgba(95, 99, 242, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#5f63f2',
                            border: '1px solid #5f63f2',
                          }}
                        >
                          +{order.products - 4}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
                      <div>
                        <p style={{ 
                          fontSize: '13px', 
                          color: token.colorTextSecondary,
                          margin: '0 0 4px 0',
                          transition: 'color 0.3s ease',
                        }}>
                          Status:
                        </p>
                        <Tag color={order.statusColor}>
                          {order.status}
                        </Tag>
                      </div>
                      <div>
                        <p style={{ 
                          fontSize: '13px', 
                          color: token.colorTextSecondary,
                          margin: '0 0 4px 0',
                          transition: 'color 0.3s ease',
                        }}>
                          Date of delivery:
                        </p>
                        <p style={{ 
                          fontSize: '14px',
                          color: token.colorText,
                          margin: 0,
                          transition: 'color 0.3s ease',
                        }}>
                          {order.deliveryDate}
                        </p>
                      </div>
                      <div>
                        <p style={{ 
                          fontSize: '13px', 
                          color: token.colorTextSecondary,
                          margin: '0 0 4px 0',
                          transition: 'color 0.3s ease',
                        }}>
                          Total:
                        </p>
                        <p style={{ 
                          fontSize: '14px',
                          fontWeight: 600,
                          color: token.colorText,
                          margin: 0,
                          transition: 'color 0.3s ease',
                        }}>
                          USD {order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Space>
                </div>

                <Button 
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => router.push(`/orders/${order.id}`)}
                  style={{ 
                    height: '40px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    backgroundColor: '#5f63f2',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
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
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </Space>

        {filteredOrders.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '48px 24px',
            backgroundColor: token.colorBgContainer,
            border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
            borderRadius: '12px',
            transition: 'all 0.3s ease',
          }}>
            <p
              style={{ 
                fontSize: '16px',
                color: token.colorTextSecondary,
                margin: 0,
                transition: 'color 0.3s ease',
              }}
            >
              No {selectedTab} orders found
            </p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default OrdersPage;