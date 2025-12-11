'use client';

import React from 'react';
import { Card, Empty, Button, theme } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartItemComponent from '../CartItemComponent';
import { useRouter } from 'next/navigation';

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

interface CartListProps {
  items: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  items,
  onQuantityChange,
  onRemove
}) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  if (items.length === 0) {
    return (
      <Card
        style={{
          backgroundColor: token.colorBgContainer,
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
          transition: 'all 0.3s ease',
        }}
        bodyStyle={{ padding: '60px 20px' }}
      >
        <Empty
          image={
            <ShoppingCartOutlined 
              style={{ 
                fontSize: '80px', 
                color: isDarkMode ? '#404040' : '#d9d9d9',
                transition: 'color 0.3s ease',
              }} 
            />
          }
          description={
            <div>
              <h3 style={{ 
                color: token.colorTextHeading, 
                fontSize: '18px', 
                marginBottom: '8px',
                transition: 'color 0.3s ease',
              }}>
                Your cart is empty
              </h3>
              <p style={{ 
                color: token.colorTextSecondary, 
                fontSize: '14px',
                transition: 'color 0.3s ease',
              }}>
                Add some products to get started
              </p>
            </div>
          }
        >
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
            Continue Shopping
          </Button>
        </Empty>
      </Card>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: token.colorTextHeading,
            margin: 0,
            transition: 'color 0.3s ease',
          }}
        >
          Shopping Cart ({items.length})
        </h2>
      </div>

      {items.map((cartItem) => (
        <CartItemComponent
          key={cartItem.id}
          item={cartItem}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;