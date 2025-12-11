'use client';

import React, { useEffect, useState } from 'react';
import { Button, Spin, theme } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import PublicLayout from '../components/PublicLayout';
import CartLayout from '../components/CartLayout';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const router = useRouter();
  const { items } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const { token } = theme.useToken();
  
  // Check multiple conditions for dark mode
  const isDarkMode = 
    token.colorBgLayout === '#000000' || 
    token.colorBgContainer === '#1f1f1f' ||
    token.colorBgContainer === '#141414' ||
    document.documentElement.classList.contains('dark');

  console.log('Dark Mode:', isDarkMode, 'BgLayout:', token.colorBgLayout, 'BgContainer:', token.colorBgContainer);

  useEffect(() => {
    // Small delay to ensure cart is loaded from localStorage
    const timer = setTimeout(() => {
      console.log('Cart Page - Items loaded:', items);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [items]);

  if (isLoading) {
    return (
      <PublicLayout>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px' 
        }}>
          <Spin size="large" />
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
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
            color: isDarkMode ? '#ffffff !important' : '#000000',
            backgroundColor: 'transparent',
            border: 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
            Continue Shopping
          </span>
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
          .light-mode-button {
            color: #000000 !important;
          }
          .light-mode-button:hover {
            background-color: rgba(0, 0, 0, 0.04) !important;
            color: #5f63f2 !important;
          }
        `}</style>
      </div>

      <CartLayout />
    </PublicLayout>
  );
};

export default CartPage;