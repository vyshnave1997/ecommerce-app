'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Divider, Radio, Space, theme } from 'antd';
import { 
  ShoppingOutlined, 
  CreditCardOutlined, 
  TagOutlined,
  SafetyOutlined,
  TruckOutlined
} from '@ant-design/icons';

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

interface CheckoutProps {
  items: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ items }) => {
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const price = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <Card
      style={{
        backgroundColor: token.colorBgContainer,
        borderRadius: '12px',
        border: '2px solid #5f63f2',
        position: 'sticky',
        top: '24px',
        transition: 'all 0.3s ease',
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 700,
          color: token.colorTextHeading,
          marginBottom: '24px',
          transition: 'color 0.3s ease',
        }}
      >
        Order Summary
      </h2>

      {/* Order Details */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}
        >
          <span style={{ 
            color: token.colorTextSecondary, 
            fontSize: '14px',
            transition: 'color 0.3s ease',
          }}>
            Subtotal ({items.length} items)
          </span>
          <span style={{ 
            color: token.colorText, 
            fontSize: '14px', 
            fontWeight: 600,
            transition: 'color 0.3s ease',
          }}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}
        >
          <span style={{ 
            color: token.colorTextSecondary, 
            fontSize: '14px',
            transition: 'color 0.3s ease',
          }}>
            Shipping
          </span>
          <span style={{ 
            color: token.colorText, 
            fontSize: '14px', 
            fontWeight: 600,
            transition: 'color 0.3s ease',
          }}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}
        >
          <span style={{ 
            color: token.colorTextSecondary, 
            fontSize: '14px',
            transition: 'color 0.3s ease',
          }}>
            Tax (10%)
          </span>
          <span style={{ 
            color: token.colorText, 
            fontSize: '14px', 
            fontWeight: 600,
            transition: 'color 0.3s ease',
          }}>
            ${tax.toFixed(2)}
          </span>
        </div>

        {shipping === 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              backgroundColor: isDarkMode ? 'rgba(95, 99, 242, 0.15)' : 'rgba(95, 99, 242, 0.1)',
              borderRadius: '8px',
              marginTop: '16px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <TruckOutlined style={{ color: '#5f63f2', fontSize: '16px' }} />
            <span style={{ color: '#5f63f2', fontSize: '13px', fontWeight: 500 }}>
              You're eligible for FREE shipping!
            </span>
          </div>
        )}
      </div>

      <Divider style={{ 
        margin: '20px 0', 
        borderColor: token.colorBorder,
        transition: 'border-color 0.3s ease',
      }} />

      {/* Coupon Code */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Input
            placeholder="Enter coupon code"
            prefix={<TagOutlined style={{ color: token.colorTextSecondary }} />}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{
              height: '44px',
              borderRadius: '8px',
              backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
              border: `1px solid ${token.colorBorder}`,
              color: token.colorText,
              transition: 'all 0.3s ease',
            }}
          />
          <Button
            style={{
              height: '44px',
              borderRadius: '8px',
              fontWeight: 500,
              minWidth: '80px',
              backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#404040' : '#d9d9d9'}`,
              color: token.colorText,
              transition: 'all 0.3s ease',
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
        borderColor: token.colorBorder,
        transition: 'border-color 0.3s ease',
      }} />

      {/* Total */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}
      >
        <span style={{ 
          fontSize: '18px', 
          fontWeight: 700, 
          color: token.colorTextHeading,
          transition: 'color 0.3s ease',
        }}>
          Total
        </span>
        <span style={{ fontSize: '24px', fontWeight: 700, color: '#5f63f2' }}>
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Payment Method */}
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: token.colorTextHeading,
            marginBottom: '12px',
            transition: 'color 0.3s ease',
          }}
        >
          Payment Method
        </h3>
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Radio
              value="card"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
                borderRadius: '8px',
                border: paymentMethod === 'card' ? '2px solid #5f63f2' : 'none',
                color: token.colorText,
                transition: 'all 0.3s ease',
              }}
            >
              <CreditCardOutlined style={{ marginRight: '8px' }} />
              Credit / Debit Card
            </Radio>
            <Radio
              value="paypal"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
                borderRadius: '8px',
                border: paymentMethod === 'paypal' ? '2px solid #5f63f2' : 'none',
                color: token.colorText,
                transition: 'all 0.3s ease',
              }}
            >
              <SafetyOutlined style={{ marginRight: '8px' }} />
              PayPal
            </Radio>
          </Space>
        </Radio.Group>
      </div>

      {/* Checkout Button */}
      <Button
        type="primary"
        icon={<ShoppingOutlined />}
        block
        size="large"
        onClick={() => {
          // Navigate to checkout page
          window.location.href = '/checkout';
        }}
        style={{
          height: '56px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 600,
          backgroundColor: '#5f63f2',
          border: 'none',
          marginBottom: '16px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#4a4ed8';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(95, 99, 242, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#5f63f2';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Proceed to Checkout
      </Button>

      {/* Security Notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px',
          backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease',
        }}
      >
        <SafetyOutlined style={{ 
          color: token.colorTextSecondary, 
          fontSize: '14px',
          transition: 'color 0.3s ease',
        }} />
        <span style={{ 
          color: token.colorTextSecondary, 
          fontSize: '13px',
          transition: 'color 0.3s ease',
        }}>
          Secure SSL encrypted checkout
        </span>
      </div>
    </Card>
  );
};

export default Checkout;