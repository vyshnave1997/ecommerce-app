'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Empty, Button, theme } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CheckoutContact, { CheckoutFormData } from '../CheckoutContact';
import CheckoutSummary from '../CheckoutSummary';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

const CheckoutLayout: React.FC = () => {
  const { items } = useCart();
  const router = useRouter();
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'standard' | 'express'>('pickup');

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      // Optional: Show a message or redirect after a delay
      console.log('Cart is empty, consider redirecting to cart page');
    }
  }, [items]);

  const handleContinue = (formData: CheckoutFormData) => {
    setDeliveryOption(formData.deliveryOption);
    console.log('Checkout form data:', formData);
    console.log('Cart items:', items);
    
    // TODO: Process checkout - send to API, payment gateway, etc.
    // For now, redirect to confirmation page
    router.push('/orders/confirmation');
  };

  // Show empty state if no items in cart
  if (items.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        padding: '40px 20px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <ShoppingCartOutlined 
            style={{ 
              fontSize: '80px', 
              color: isDarkMode ? '#404040' : '#d9d9d9',
              marginBottom: '24px'
            }} 
          />
          <h2 style={{ 
            color: token.colorTextHeading, 
            fontSize: '24px', 
            marginBottom: '12px',
            fontWeight: 600
          }}>
            Your cart is empty
          </h2>
          <p style={{ 
            color: token.colorTextSecondary, 
            fontSize: '16px',
            marginBottom: '32px'
          }}>
            Add some products to your cart before proceeding to checkout
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push('/')}
            style={{
              height: '48px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              backgroundColor: '#5f63f2',
              border: 'none',
              paddingLeft: '32px',
              paddingRight: '32px'
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]}>
      {/* Left Column - Contact & Shipping Forms */}
      <Col xs={24} lg={14}>
        <CheckoutContact onContinue={handleContinue} />
      </Col>

      {/* Right Column - Order Summary */}
      <Col xs={24} lg={10}>
        <CheckoutSummary items={items} deliveryOption={deliveryOption} />
      </Col>
    </Row>
  );
};

export default CheckoutLayout;