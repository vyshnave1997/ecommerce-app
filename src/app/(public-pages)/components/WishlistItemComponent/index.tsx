'use client';

import React from 'react';
import { Card, Button, theme, Rate } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface WishlistItemData {
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

interface WishlistItemComponentProps {
  item: WishlistItemData;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

const WishlistItemComponent: React.FC<WishlistItemComponentProps> = ({
  item,
  onRemove,
  onAddToCart
}) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  const discountedPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

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
            width: '140px',
            height: '140px',
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
          {item.discount && item.discount > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#ff4d4f',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              -{item.discount}%
            </div>
          )}
        </div>

        {/* Product Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            {item.brand && (
              <div style={{ 
                fontSize: '12px', 
                color: token.colorTextSecondary,
                marginBottom: '4px',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                {item.brand}
              </div>
            )}
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

            {item.rating && (
              <div style={{ marginBottom: '12px' }}>
                <Rate
                  disabled
                  defaultValue={item.rating}
                  style={{ fontSize: '14px' }}
                  allowHalf
                />
                <span style={{ 
                  marginLeft: '8px',
                  fontSize: '13px',
                  color: token.colorTextSecondary
                }}>
                  ({item.rating})
                </span>
              </div>
            )}

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
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#5f63f2',
                  transition: 'color 0.3s ease',
                }}
              >
                ${discountedPrice.toFixed(2)}
              </span>
              {item.discount && item.discount > 0 && (
                <span
                  style={{
                    fontSize: '16px',
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

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '16px'
            }}
          >
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => onAddToCart(item.id)}
              style={{
                height: '44px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: '#5f63f2',
                border: 'none',
                flex: 1,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4a4ed8';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#5f63f2';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Add to Cart
            </Button>

            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemove(item.id)}
              style={{
                height: '44px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                minWidth: '44px',
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WishlistItemComponent;