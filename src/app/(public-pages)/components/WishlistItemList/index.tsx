'use client';

import React from 'react';
import { Card, Empty, Button, theme } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import WishlistItemComponent from '../WishlistItemComponent';
import { useRouter } from 'next/navigation';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  discount?: number;
  rating?: number;
  brand?: string;
}

interface WishlistListProps {
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

const WishlistList: React.FC<WishlistListProps> = ({
  items,
  onRemove,
  onAddToCart
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
            <HeartOutlined 
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
                Your wishlist is empty
              </h3>
              <p style={{ 
                color: token.colorTextSecondary, 
                fontSize: '14px',
                transition: 'color 0.3s ease',
              }}>
                Save your favorite items for later
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
            Start Shopping
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
          My Wishlist ({items.length})
        </h2>
        <Button
          type="default"
          onClick={() => router.push('/cart')}
          style={{
            height: '40px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
            border: `1px solid ${isDarkMode ? '#404040' : '#d9d9d9'}`,
            color: token.colorText,
          }}
        >
          View Cart
        </Button>
      </div>

      {items.map((wishlistItem) => (
        <WishlistItemComponent
          key={wishlistItem.id}
          item={wishlistItem}
          onRemove={onRemove}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default WishlistList;