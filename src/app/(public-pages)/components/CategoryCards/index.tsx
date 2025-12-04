'use client';

import React from 'react';
import { Row, Col, theme, Typography, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import productsData from '@/data/products.json';

const { Title } = Typography;

// Category images mapping
const categoryImages: Record<string, string> = {
  computers: '/images/laptop.png',
  smartwatches: '/images/watch.png',
  'mini-cameras': '/images/camera.png',
  headphones: '/images/headset.png',
  printers: '/images/printer.png',
  multimedia: '/images/sound.png',
  accessories: '/images/others.png',
  phones: '/images/phone.png',
  // Additional fallback images for any new categories
  smartphones: '/images/phone.png',
  tablets: '/images/tablet.png',
  tvs: '/images/tv.png',
  cameras: '/images/camera.png',
  audio: '/images/sound.png',
  networking: '/images/internet.png',
};

// Default image for unknown categories
const defaultImage = '/images/others.png';

// Category display names mapping
const categoryDisplayNames: Record<string, string> = {
  computers: 'Laptops',
  smartwatches: 'Watches',
  'mini-cameras': 'Mini Cameras',
  headphones: 'Headsets',
  printers: 'Printers',
  multimedia: 'Sound',
  accessories: 'Others',
  phones: 'Smartphones',
  smartphones: 'Smartphones',
  tablets: 'Tablets',
  tvs: 'TV sets',
  cameras: 'Cameras',
  audio: 'Audio',
  networking: 'Internet',
};

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  onClick?: () => void;
  isDarkMode: boolean;
  token: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, onClick, isDarkMode, token }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        textAlign: 'center',
      }}
      className="category-item"
    >
      <div
        className="category-card-image"
        style={{
          borderRadius: '24px',
          backgroundColor: isDarkMode ? '#1f1f1f' : '#f0f4ff',
          padding: '32px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '140px',
          transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          boxShadow: isDarkMode 
            ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 500,
          color: token.colorTextHeading,
          marginTop: '12px',
          lineHeight: 1.5,
        }}
      >
        {name}
      </div>
    </div>
  );
};

interface CategoryCardsProps {
  category?: string;
  onCategoryClick?: (categoryId: string) => void;
  showBreadcrumb?: boolean;
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ 
  category = 'Electronics', 
  onCategoryClick,
  showBreadcrumb = true 
}) => {
  const { token } = theme.useToken();
  const router = useRouter();
  
  // Detect dark mode using the same method as Footer
  const isDarkMode = token.colorBgLayout === '#000000' || 
                     token.colorBgContainer === '#1f1f1f';
  
  const categories = productsData.categories;

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Clicked category: ${categoryId}`);
    
    // Always use the callback if provided
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <div
      style={{
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: isDarkMode ? token.colorBgContainer : '#ffffff',
        borderRadius: '8px',
        border: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
      }}
    >
      {/* Breadcrumb - only show if showBreadcrumb is true */}
      {showBreadcrumb && (
        <Breadcrumb
          style={{ marginBottom: '24px' }}
          items={[
            {
              href: '/',
              title: (
                <>
                  <HomeOutlined />
                  <span>Home</span>
                </>
              ),
            },
            {
              title: category,
            },
          ]}
        />
      )}

      {/* Page Title - only show if showBreadcrumb is true */}
      {showBreadcrumb && (
        <Title 
          level={2} 
          style={{ 
            marginBottom: '32px',
            color: token.colorTextHeading,
            fontWeight: 600,
          }}
        >
          {category}
        </Title>
      )}

      <Row gutter={[24, 24]} justify="start">
        {categories.map((category) => (
          <Col
            key={category.id}
            xs={12}
            sm={8}
            md={6}
            lg={6}
            xl={3}
          >
            <CategoryCard
              id={category.id}
              name={categoryDisplayNames[category.id] || category.name}
              image={categoryImages[category.id] || defaultImage}
              onClick={() => handleCategoryClick(category.id)}
              isDarkMode={isDarkMode}
              token={token}
            />
          </Col>
        ))}
      </Row>

      <style dangerouslySetInnerHTML={{__html: `
        .category-item:hover .category-card-image {
          transform: translateY(-6px);
          box-shadow: ${isDarkMode 
            ? '0 12px 28px rgba(0, 0, 0, 0.4) !important' 
            : '0 12px 28px rgba(0, 0, 0, 0.15) !important'};
        }

        .category-item:active .category-card-image {
          transform: translateY(-2px);
        }

        .category-card-image img {
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .category-item:hover .category-card-image img {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .category-card-image {
            border-radius: 16px !important;
            padding: 24px 16px !important;
            height: 120px !important;
          }
          
          .category-card-image > div {
            width: 60px !important;
            height: 60px !important;
          }

          .category-item > div:last-child {
            font-size: 14px !important;
            margin-top: 8px !important;
          }
        }

        @media (max-width: 480px) {
          .category-card-image {
            padding: 20px 12px !important;
            height: 100px !important;
          }

          .category-card-image > div {
            width: 50px !important;
            height: 50px !important;
          }

          .category-item > div:last-child {
            font-size: 13px !important;
          }
        }
      `}} />
    </div>
  );
};

export default CategoryCards;