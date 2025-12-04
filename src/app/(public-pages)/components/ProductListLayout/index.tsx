'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Drawer, Button, theme, Breadcrumb, Typography } from 'antd';
import { FilterOutlined, HomeOutlined } from '@ant-design/icons';
import FilterSidebar, { FilterState } from '../ProductListFilters';
import ProductList from '../ProductListItems';
import CategoryCards from '../CategoryCards';

const { Title } = Typography;

interface ProductsPageLayoutProps {
  initialCategory?: string;
  showCategoryCards?: boolean;
}

const ProductsPageLayout: React.FC<ProductsPageLayoutProps> = ({ 
  initialCategory = 'all',
  showCategoryCards = false 
}) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    brands: [],
    condition: 'any',
    priceRange: [0, 2000],
    ratings: []
  });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleCategoryClick = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      category: categoryId,
      brands: [], // Reset brands when category changes
    }));
    // Hide category cards and show products after selection
    setShowProducts(true);
  };

  const [showProducts, setShowProducts] = useState(!showCategoryCards);

  // Get category name for display
  const getCategoryName = () => {
    if (filters.category === 'all') return 'All Electronics';
    const categoryData = require('@/data/products.json').categories.find(
      (cat: any) => cat.id === filters.category
    );
    return categoryData ? categoryData.name : 'Electronics';
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: isDarkMode ? token.colorBgLayout : '#fafafa',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Breadcrumb and Title - Always visible */}
        <div style={{ marginBottom: '24px' }}>
          <Breadcrumb
            style={{ marginBottom: '16px' }}
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
                title: getCategoryName(),
              },
            ]}
          />
          
          <Title 
            level={2} 
            style={{ 
              margin: 0,
              color: token.colorTextHeading,
              fontWeight: 600,
            }}
          >
            {getCategoryName()}
          </Title>
        </div>
        {/* Mobile Filter Button - only show when products are visible */}
        {isMobile && showProducts && (
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{
              marginBottom: '16px',
              height: '44px',
              borderRadius: '8px',
              fontWeight: 500
            }}
          >
            Filters
          </Button>
        )}

        <Row gutter={24}>
          {/* Desktop Sidebar - show when products are visible */}
          {!isMobile && showProducts && (
            <Col xs={0} lg={6} xl={5}>
              <div style={{ position: 'sticky', top: '24px' }}>
                <FilterSidebar 
                  onFilterChange={handleFilterChange}
                  selectedCategory={filters.category}
                />
              </div>
            </Col>
          )}

          {/* Product List or Category Cards */}
          <Col xs={24} lg={showProducts ? 18 : 24} xl={showProducts ? 19 : 24}>
            {!showProducts ? (
              <CategoryCards 
                category={filters.category}
                onCategoryClick={handleCategoryClick}
                showBreadcrumb={false}
              />
            ) : (
              <ProductList filters={filters} />
            )}
          </Col>
        </Row>

        {/* Mobile Filter Drawer */}
        {showProducts && (
          <Drawer
            title="Filters"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={320}
            styles={{
              body: { padding: 0 },
              header: {
                backgroundColor: isDarkMode ? token.colorBgContainer : '#ffffff',
                borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
              }
            }}
          >
            <FilterSidebar 
              onFilterChange={handleFilterChange}
              selectedCategory={filters.category}
            />
            <div style={{
              position: 'sticky',
              bottom: 0,
              padding: '16px',
              backgroundColor: isDarkMode ? token.colorBgContainer : '#ffffff',
              borderTop: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
            }}>
              <Button
                type="primary"
                block
                onClick={() => setDrawerVisible(false)}
                style={{
                  height: '44px',
                  borderRadius: '8px',
                  fontWeight: 500
                }}
              >
                Show Results
              </Button>
            </div>
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default ProductsPageLayout;