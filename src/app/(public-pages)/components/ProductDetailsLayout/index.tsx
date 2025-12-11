'use client';

import React, { useState } from 'react';
import { Row, Col, theme } from 'antd';
import ProductDetail from '../ProductDetail';
import ProductOrderCard from '../ProductOrderCard';
import ProductInfo from '../ProductInfo';
import CommentReview from '../CommentReview';

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

interface ProductDetailsLayoutProps {
  product: Product;
}

const ProductDetailsLayout: React.FC<ProductDetailsLayoutProps> = ({ product }) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';
  
  // State to track selected color and size
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <>
      <Row gutter={[24, 24]}>
        {/* Left Column - Product Details */}
        <Col xs={24} lg={16}>
          <ProductDetail 
            product={product} 
            isDarkMode={isDarkMode} 
            token={token}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
          />
        </Col>

        {/* Right Column - Order Card */}
        <Col xs={24} lg={8}>
          <ProductOrderCard 
            product={product} 
            isDarkMode={isDarkMode} 
            token={token}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
          />
        </Col>
      </Row>

      {/* Second Row - Product Info and Reviews Side by Side */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <ProductInfo product={product} isDarkMode={isDarkMode} token={token} />
        </Col>
        <Col xs={24} lg={12}>
          <CommentReview product={product} isDarkMode={isDarkMode} token={token} />
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailsLayout;