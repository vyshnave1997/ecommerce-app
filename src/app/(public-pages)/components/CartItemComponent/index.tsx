'use client';

import React from 'react';
import { Card, Button, theme } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
  discount?: number;
}

interface CartItemComponentProps {
  item: CartItemData;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  onQuantityChange,
  onRemove
}) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  const discountedPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  return (
    <Card
      style={{
        backgroundColor: token.colorBgContainer,
        borderRadius: '12px',
        border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
        marginBottom: '16px',
        transition: 'all 0.3s ease',
      }}
      bodyStyle={{ padding: '20px' }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Product Image */}
        <div
          style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
            borderRadius: '8px',
            flexShrink: 0,
            overflow: 'hidden',
            transition: 'background-color 0.3s ease',
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: 'contain', padding: '16px' }}
          />
        </div>

        {/* Product Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: token.colorTextHeading,
                marginBottom: '8px',
                lineHeight: '1.4',
                transition: 'color 0.3s ease',
              }}
            >
              {item.name}
            </h3>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              {item.color && (
                <span style={{ 
                  fontSize: '14px', 
                  color: token.colorTextSecondary,
                  transition: 'color 0.3s ease',
                }}>
                  Color: <strong style={{ color: token.colorText }}>{item.color}</strong>
                </span>
              )}
              {item.size && (
                <span style={{ 
                  fontSize: '14px', 
                  color: token.colorTextSecondary,
                  transition: 'color 0.3s ease',
                }}>
                  Size: <strong style={{ color: token.colorText }}>{item.size}</strong>
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: token.colorText,
                  transition: 'color 0.3s ease',
                }}
              >
                ${discountedPrice.toFixed(2)}
              </span>
              {item.discount && item.discount > 0 && (
                <span
                  style={{
                    fontSize: '14px',
                    color: isDarkMode ? '#666' : '#999',
                    textDecoration: 'line-through',
                    transition: 'color 0.3s ease',
                  }}
                >
                  ${item.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls and Remove Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '16px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
                borderRadius: '8px',
                border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <Button
                type="text"
                icon={<MinusOutlined />}
                onClick={handleDecrement}
                style={{
                  height: '40px',
                  width: '40px',
                  border: 'none',
                  borderRadius: 0,
                  color: token.colorText,
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#e6e6e6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              />
              <div
                style={{
                  width: '60px',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: token.colorText,
                  borderLeft: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
                  borderRight: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                {item.quantity}
              </div>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={handleIncrement}
                style={{
                  height: '40px',
                  width: '40px',
                  border: 'none',
                  borderRadius: 0,
                  color: token.colorText,
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#e6e6e6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              />
            </div>

            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemove(item.id)}
              style={{
                height: '40px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItemComponent;