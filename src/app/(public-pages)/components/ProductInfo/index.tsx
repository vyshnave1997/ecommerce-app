'use client';

import React from 'react';
import { Card, Divider } from 'antd';

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

interface ProductInfoProps {
  product: Product;
  isDarkMode: boolean;
  token: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, isDarkMode, token }) => {
  // Mock specifications data
  const specifications = [
    { label: 'Memory size', value: '128 GB' },
    { label: 'Material type', value: 'Plastic and metall' },
    { label: 'Screen resolution', value: '12.5 inch' },
    { label: 'Power source', value: 'Electricity' },
    { label: 'Compatibility', value: 'Android OS, Windows' }
  ];

  return (
    <Card
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        borderRadius: '12px',
        border: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
        marginTop: '24px'
      }}
      bodyStyle={{ padding: '32px' }}
    >
      {/* Detailed Information Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: token.colorText,
          marginBottom: '24px'
        }}>
          Detailed information
        </h2>
        
        <div style={{
          color: token.colorText,
          fontSize: '14px',
          lineHeight: '1.8',
          marginBottom: '16px'
        }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
        
        <div style={{
          color: token.colorText,
          fontSize: '14px',
          lineHeight: '1.8'
        }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>

      {/* Specifications Table */}
      <div>
        {specifications.map((spec, index) => (
          <div key={index}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0'
            }}>
              <span style={{
                fontSize: '15px',
                fontWeight: 500,
                color: token.colorText
              }}>
                {spec.label}
              </span>
              <span style={{
                fontSize: '15px',
                color: token.colorTextSecondary
              }}>
                {spec.value}
              </span>
            </div>
            {index < specifications.length - 1 && (
              <Divider style={{
                margin: 0,
                borderColor: isDarkMode ? '#303030' : '#e0e0e0'
              }} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProductInfo;