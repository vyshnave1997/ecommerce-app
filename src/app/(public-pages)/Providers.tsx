'use client';

import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm, // Change to theme.darkAlgorithm for dark mode
        token: {
          colorPrimary: '#4c6ef5',
        },
      }}
    >
      <CartProvider>
        <WishlistProvider>
        {children}
        </WishlistProvider>
      </CartProvider>
    </ConfigProvider>
  );
}