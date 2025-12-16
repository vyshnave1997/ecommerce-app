// ==================== FILE: app/order/components/OrderCard.tsx ====================
'use client';

import React from 'react';
import { Card, Button, Space, Tag, theme, Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface OrderCardProps {
  order: any;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  return (
    <Card
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
        alignItems: 'flex-start',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: token.colorTextHeading,
                margin: '0 0 4px 0',
                transition: 'color 0.3s ease',
              }}>
                Order #: {order.id}
              </h3>
              <p style={{
                fontSize: '13px',
                color: token.colorTextSecondary,
                margin: 0,
                transition: 'color 0.3s ease',
              }}>
                {order.products} Products | By {order.createdBy} | {order.createdAt}
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginTop: '4px',
              marginBottom: '4px',
              flexWrap: 'wrap'
            }}>
              {order.productImages.slice(0, 4).map((img: string, idx: number) => (
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
                    transition: 'all 0.3s ease',
                    border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <Image
                    src={img}
                    alt="Product"
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover' }}
                    preview={false}
                  />
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
                <Tag color={order.statusColor}>{order.status}</Tag>
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
          onClick={() => router.push(`/order/${order.id}`)}
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
  );
};

export default OrderCard;