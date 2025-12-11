'use client';

import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined, CheckOutlined, HeartOutlined, TruckOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  comments: number;
  image: string;
  colors: string[];
  sizes: string[];
  discount?: number;
  brand?: string;
  category?: string;
}

interface ProductOrderCardProps {
  product: Product;
  isDarkMode: boolean;
  token: any;
  selectedColor?: string;
  selectedSize?: string;
}

const ProductOrderCard: React.FC<ProductOrderCardProps> = ({ 
  product, 
  isDarkMode, 
  token,
  selectedColor,
  selectedSize 
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCart();
  const router = useRouter();

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      color: selectedColor || product.colors[0],
      size: selectedSize || product.sizes[0],
      discount: product.discount,
      brand: product.brand
    };

    console.log('Adding to cart:', cartItem); // Debug log
    addToCart(cartItem);
    console.log('Cart after adding:', items); // Debug log
  };

  const handleBuyNow = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      color: selectedColor || product.colors[0],
      size: selectedSize || product.sizes[0],
      discount: product.discount,
      brand: product.brand
    };

    console.log('Buy Now - Adding to cart:', cartItem); // Debug log
    addToCart(cartItem);
    
    // Longer delay to ensure state and localStorage are updated
    setTimeout(() => {
      console.log('Navigating to cart...');
      router.push('/cart');
    }, 300);
  };

  return (
    <Card
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        borderRadius: '12px',
        border: isDarkMode ? '2px solid #4c6ef5' : '2px solid #4c6ef5',
        position: 'sticky',
        top: '24px'
      }}
      bodyStyle={{ padding: '24px' }}
    >
      {/* Price Section */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '12px',
          marginBottom: '8px'
        }}>
          <span style={{
            fontSize: '32px',
            fontWeight: 700,
            color: token.colorText
          }}>
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount && product.discount > 0 && (
            <span style={{
              fontSize: '18px',
              color: token.colorTextSecondary,
              textDecoration: 'line-through'
            }}>
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <div style={{
          fontSize: '13px',
          color: token.colorTextSecondary
        }}>
          Price per item, Includes VAT
        </div>
      </div>

      {/* Quantity Selector */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
          borderRadius: '8px',
          border: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
          overflow: 'hidden'
        }}>
          <Button
            type="text"
            icon={<MinusOutlined />}
            onClick={decrementQuantity}
            style={{
              height: '48px',
              width: '48px',
              border: 'none',
              borderRadius: 0,
              color: token.colorText,
              backgroundColor: 'transparent'
            }}
          />
          <div style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 600,
            color: token.colorText,
            borderLeft: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
            borderRight: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {quantity}
          </div>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={incrementQuantity}
            style={{
              height: '48px',
              width: '48px',
              border: 'none',
              borderRadius: 0,
              color: token.colorText,
              backgroundColor: 'transparent'
            }}
          />
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        block
        size="large"
        onClick={handleAddToCart}
        style={{
          height: '52px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '12px',
          backgroundColor: '#4c6ef5',
          border: 'none'
        }}
      >
        Add to cart
      </Button>

      {/* Buy Now Button */}
      <Button
        block
        size="large"
        onClick={handleBuyNow}
        style={{
          height: '52px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 500,
          marginBottom: '12px',
          backgroundColor: isDarkMode ? 'rgba(76, 110, 245, 0.1)' : 'rgba(76, 110, 245, 0.08)',
          border: 'none',
          color: '#4c6ef5'
        }}
      >
        Buy now
      </Button>

      {/* Add to Wishlist Button */}
      <Button
        icon={<HeartOutlined />}
        block
        size="large"
        style={{
          height: '52px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 500,
          marginBottom: '24px',
          backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
          border: 'none',
          color: token.colorText
        }}
      >
        Add to wishlist
      </Button>

      {/* Features List */}
      <div style={{
        borderTop: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
        paddingTop: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <CheckOutlined style={{ 
            color: '#4c6ef5', 
            fontSize: '18px',
            marginTop: '2px'
          }} />
          <div>
            <TruckOutlined style={{ 
              color: token.colorText, 
              fontSize: '16px',
              marginRight: '8px'
            }} />
            <span style={{
              color: token.colorText,
              fontSize: '14px',
              fontWeight: 500
            }}>
              Worldwide shipping
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <CheckOutlined style={{ 
            color: '#4c6ef5', 
            fontSize: '18px',
            marginTop: '2px'
          }} />
          <div>
            <LockOutlined style={{ 
              color: token.colorText, 
              fontSize: '16px',
              marginRight: '8px'
            }} />
            <span style={{
              color: token.colorText,
              fontSize: '14px',
              fontWeight: 500
            }}>
              Secure payment
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <CheckOutlined style={{ 
            color: '#4c6ef5', 
            fontSize: '18px',
            marginTop: '2px'
          }} />
          <div>
            <SafetyOutlined style={{ 
              color: token.colorText, 
              fontSize: '16px',
              marginRight: '8px'
            }} />
            <span style={{
              color: token.colorText,
              fontSize: '14px',
              fontWeight: 500
            }}>
              2 years full warranty
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductOrderCard;