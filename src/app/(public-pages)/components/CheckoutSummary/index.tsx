'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Divider, theme, Typography } from 'antd';
import Image from 'next/image';

const { Title, Text } = Typography;

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
  discount?: number;
}

interface CheckoutSummaryProps {
  items: CartItem[];
  deliveryOption?: 'pickup' | 'standard' | 'express';
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ 
  items, 
  deliveryOption = 'pickup' 
}) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';
  const [couponCode, setCouponCode] = useState('');

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const price = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const discount = 5.40;
  const deliveryCost = 
    deliveryOption === 'pickup' ? 0 : 
    deliveryOption === 'standard' ? 9.00 : 
    15.00;
  const tax = subtotal * 0.038; // 3.8% tax
  const total = subtotal - discount + deliveryCost + tax;

  return (
    <Card
      style={{
        backgroundColor: token.colorBgContainer,
        borderRadius: '12px',
        border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
        position: 'sticky',
        top: '24px',
        transition: 'all 0.3s ease',
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <Title level={4} style={{ 
        color: token.colorTextHeading, 
        marginBottom: '24px',
        fontSize: '18px',
        fontWeight: 600
      }}>
        Order summary
      </Title>

      {/* Order Items */}
      <div style={{ marginBottom: '24px' }}>
        {items.map((item) => {
          const itemPrice = item.discount
            ? item.price * (1 - item.discount / 100)
            : item.price;
          
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '60px',
                  height: '60px',
                  backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
                  borderRadius: '8px',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'contain', padding: '8px' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text strong style={{ 
                  color: token.colorText, 
                  fontSize: '14px', 
                  display: 'block',
                  marginBottom: '4px',
                  lineHeight: '1.4'
                }}>
                  {item.name}
                </Text>
                <Text type="secondary" style={{ fontSize: '13px', display: 'block' }}>
                  Color: {item.color || 'White'}
                </Text>
                <Text type="secondary" style={{ fontSize: '13px' }}>
                  Qty: {item.quantity}
                </Text>
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}>
                <Text strong style={{ color: token.colorText, fontSize: '14px' }}>
                  ${(itemPrice * item.quantity).toFixed(2)}
                </Text>
                {item.size && (
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Size: {item.size}
                  </Text>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupon Code */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Input
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{
              height: '44px',
              borderRadius: '6px',
              backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`,
              color: token.colorText,
            }}
          />
          <Button
            style={{
              height: '44px',
              borderRadius: '6px',
              fontWeight: 500,
              minWidth: '80px',
              backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#404040' : '#d9d9d9'}`,
              color: token.colorText,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#333' : '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#2a2a2a' : '#ffffff';
            }}
          >
            Apply
          </Button>
        </div>
      </div>

      <Divider style={{ 
        margin: '20px 0', 
        borderColor: token.colorBorder 
      }} />

      {/* Price Breakdown */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '12px',
          alignItems: 'center'
        }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>Subtotal:</Text>
          <Text style={{ color: token.colorText, fontSize: '14px', fontWeight: 500 }}>
            ${subtotal.toFixed(2)}
          </Text>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '12px',
          alignItems: 'center'
        }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>Discount:</Text>
          <Text style={{ color: '#52c41a', fontSize: '14px', fontWeight: 500 }}>
            -${discount.toFixed(2)}
          </Text>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '12px',
          alignItems: 'center'
        }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>Delivery cost:</Text>
          <Text style={{ color: token.colorText, fontSize: '14px', fontWeight: 500 }}>
            {deliveryCost === 0 ? (
              <span style={{ color: '#52c41a' }}>FREE</span>
            ) : (
              `$${deliveryCost.toFixed(2)}`
            )}
          </Text>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '12px',
          alignItems: 'center'
        }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>Tax:</Text>
          <Text style={{ color: token.colorText, fontSize: '14px', fontWeight: 500 }}>
            ${tax.toFixed(2)}
          </Text>
        </div>
      </div>

      <Divider style={{ 
        margin: '20px 0', 
        borderColor: token.colorBorder 
      }} />

      {/* Total */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '8px 0'
      }}>
        <Text strong style={{ 
          fontSize: '18px', 
          color: token.colorTextHeading,
          fontWeight: 600
        }}>
          Total:
        </Text>
        <Text strong style={{ 
          fontSize: '24px', 
          color: '#5f63f2',
          fontWeight: 700
        }}>
          ${total.toFixed(2)}
        </Text>
      </div>
    </Card>
  );
};

export default CheckoutSummary;