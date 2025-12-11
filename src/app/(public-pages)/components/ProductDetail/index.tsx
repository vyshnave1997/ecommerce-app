'use client';

import React, { useState } from 'react';
import { Card, Rate, Button, Radio, Row, Col } from 'antd';
import { CheckCircleFilled, ShoppingCartOutlined, MessageOutlined } from '@ant-design/icons';
import Image from 'next/image';

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

interface ProductDetailProps {
  product: Product;
  isDarkMode: boolean;
  token: any;
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  isDarkMode, 
  token,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock multiple images (in real app, these would come from product data)
  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <Card
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        borderRadius: '12px',
        border: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
      }}
      bodyStyle={{ padding: '32px' }}
    >
      <Row gutter={[32, 32]}>
        {/* Image Gallery */}
        <Col xs={24} md={12}>
          <div>
            {/* Main Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '100%',
              backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
              borderRadius: '12px',
              marginBottom: '16px',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
              }}>
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'contain', padding: '40px' }}
                />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '12px'
            }}>
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    position: 'relative',
                    paddingTop: '100%',
                    backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: selectedImage === index 
                      ? `2px solid ${token.colorPrimary}` 
                      : isDarkMode ? '2px solid #303030' : '2px solid #e0e0e0',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                  }}>
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      style={{ objectFit: 'contain', padding: '8px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Product Info */}
        <Col xs={24} md={12}>
          <div>
            {/* Title */}
            <h1 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: token.colorText,
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              {product.name}
            </h1>

            {/* Rating and Orders */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rate
                  disabled
                  defaultValue={product.rating}
                  style={{ fontSize: '16px' }}
                  allowHalf
                />
                <span style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: token.colorText
                }}>
                  {product.rating}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageOutlined style={{ color: token.colorTextSecondary }} />
                <span style={{ color: token.colorTextSecondary, fontSize: '14px' }}>
                  {product.comments} reviews
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShoppingCartOutlined style={{ color: token.colorTextSecondary }} />
                <span style={{ color: token.colorTextSecondary, fontSize: '14px' }}>
                  {product.comments} orders
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px'
            }}>
              <CheckCircleFilled style={{ color: '#52c41a', fontSize: '16px' }} />
              <span style={{
                color: '#52c41a',
                fontWeight: 500,
                fontSize: '14px'
              }}>
                In stock
              </span>
            </div>

            {/* Product Details */}
            <div style={{
              backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                color: token.colorText
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Material:</strong> Leather
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Color:</strong> {product.colors.join(', ')}
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Size:</strong> 23 inch x 31 inch
                </li>
                <li style={{ marginBottom: '0' }}>
                  <strong>Weight:</strong> 1500 gr
                </li>
              </ul>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: token.colorText,
                marginBottom: '12px'
              }}>
                Color: <span style={{ color: token.colorPrimary }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    onClick={() => onColorChange(color)}
                    style={{
                      height: '44px',
                      minWidth: '100px',
                      borderRadius: '6px',
                      backgroundColor: selectedColor === color 
                        ? token.colorPrimary 
                        : isDarkMode ? '#2a2a2a' : '#ffffff',
                      border: selectedColor === color 
                        ? 'none' 
                        : isDarkMode ? '1px solid #404040' : '1px solid #d9d9d9',
                      color: selectedColor === color ? '#ffffff' : token.colorText,
                      fontWeight: selectedColor === color ? 600 : 400
                    }}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: token.colorText,
                marginBottom: '12px'
              }}>
                Size: <span style={{ color: token.colorPrimary }}>{selectedSize}</span>
              </div>
              <Radio.Group
                value={selectedSize}
                onChange={(e) => onSizeChange(e.target.value)}
                style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
              >
                {product.sizes.map((size) => (
                  <Radio.Button
                    key={size}
                    value={size}
                    style={{
                      height: '44px',
                      minWidth: '80px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: selectedSize === size 
                        ? token.colorPrimary 
                        : isDarkMode ? '#2a2a2a' : '#ffffff',
                      color: selectedSize === size ? '#ffffff' : token.colorText,
                      border: selectedSize === size 
                        ? 'none' 
                        : isDarkMode ? '1px solid #404040' : '1px solid #d9d9d9'
                    }}
                  >
                    {size}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetail;