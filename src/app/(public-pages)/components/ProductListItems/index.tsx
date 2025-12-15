'use client';

import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Button, Select, theme, Rate, Pagination, message } from 'antd';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import productsData from '@/data/products.json';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import type { FilterState } from '../ProductListFilters';

const { Option } = Select;

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

interface ProductListProps {
  filters?: FilterState;
}

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  const { token } = theme.useToken();
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('best-match');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // 4 rows × 3 columns = 12 products per page

  // Extract all products from the data
  const allProducts: Product[] = useMemo(() => {
    return productsData.categories.flatMap(category =>
      category.brands.flatMap(brand =>
        brand.products.map(product => ({
          ...product,
          brand: brand.name,
          category: category.id
        }))
      )
    );
  }, []);

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    if (filters) {
      // Category filter
      if (filters.category && filters.category !== 'all') {
        products = products.filter(p => p.category === filters.category);
      }

      // Brand filter
      if (filters.brands && filters.brands.length > 0) {
        products = products.filter(p => filters.brands.includes(p.brand || ''));
      }

      // Price range filter
      if (filters.priceRange) {
        products = products.filter(p => 
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );
      }

      // Rating filter
      if (filters.ratings && filters.ratings.length > 0) {
        products = products.filter(p => {
          const productRating = Math.floor(p.rating);
          return filters.ratings.some(r => productRating >= r);
        });
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'best-match':
      default:
        // Keep original order or sort by rating
        products.sort((a, b) => b.rating - a.rating);
        break;
    }

    return products;
  }, [allProducts, filters, sortBy]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const toggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      message.success('Removed from wishlist');
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: product.colors[0],
        size: product.sizes[0],
        discount: product.discount,
        rating: product.rating,
        brand: product.brand,
      };
      addToWishlist(wishlistItem);
      message.success('Added to wishlist!');
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      color: product.colors[0],
      size: product.sizes[0],
      discount: product.discount,
      brand: product.brand,
    };
    
    addToCart(cartItem);
    message.success('Added to cart!');
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const isFavorite = isInWishlist(product.id);
    const discountedPrice = product.discount 
      ? product.price * (1 - product.discount / 100) 
      : product.price;

    return (
      <Card
        hoverable
        onClick={() => handleProductClick(product.id)}
        style={{
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          borderRadius: '12px',
          border: 'none',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isDarkMode 
            ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        bodyStyle={{ 
          padding: '16px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = isDarkMode 
            ? '0 4px 16px rgba(0, 0, 0, 0.4)' 
            : '0 4px 16px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = isDarkMode 
            ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)';
        }}
      >
        {/* Image Container */}
        <div style={{ 
          position: 'relative',
          width: 'calc(100% + 32px)',
          marginLeft: '-16px',
          marginTop: '-16px',
          paddingTop: '100%',
          backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
          marginBottom: '16px'
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
            padding: '20px'
          }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain', padding: '20px' }}
            />
          </div>
          
          {/* Favorite Button */}
          <Button
            type="text"
            icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
            onClick={(e) => toggleWishlist(product, e)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: isFavorite 
                ? (isDarkMode ? 'rgba(255, 77, 79, 0.2)' : 'rgba(255, 77, 79, 0.15)')
                : (isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.9)'),
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}
          />

          {/* Discount Badge */}
          {product.discount && product.discount > 0 && (
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: '#ff4d4f',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 500,
            color: token.colorText,
            marginBottom: '8px',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '42px'
          }}>
            {product.name}
          </h3>
          
          <p style={{
            fontSize: '13px',
            fontWeight: 400,
            color: token.colorTextSecondary,
            marginBottom: '12px',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.description}
          </p>

          {/* Rating */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '12px'
          }}>
            <Rate 
              disabled 
              defaultValue={product.rating} 
              style={{ fontSize: '14px' }}
              allowHalf
            />
            <span style={{ 
              fontSize: '14px', 
              fontWeight: 500,
              color: token.colorText 
            }}>
              {product.rating}
            </span>
            <span style={{ 
              fontSize: '12px', 
              color: token.colorTextSecondary 
            }}>
              ({product.comments} orders)
            </span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '16px' }}>
            {product.discount && product.discount > 0 ? (
              <div>
                <span style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: token.colorPrimary,
                  marginRight: '8px'
                }}>
                  ${discountedPrice.toFixed(2)}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: token.colorTextSecondary,
                  textDecoration: 'line-through'
                }}>
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span style={{
                fontSize: '20px',
                fontWeight: 600,
                color: token.colorPrimary
              }}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            icon={<ShoppingCartOutlined />}
            block
            onClick={(e) => handleAddToCart(product, e)}
            style={{
              height: '44px',
              borderRadius: '8px',
              backgroundColor: isDarkMode ? '#2a2a2a' : '#e6e6e6',
              border: 'none',
              color: token.colorText,
              fontWeight: 500,
              marginTop: 'auto',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5f63f2';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#2a2a2a' : '#e6e6e6';
              e.currentTarget.style.color = token.colorText;
            }}
          >
            Add to cart
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div style={{
      backgroundColor: isDarkMode ? token.colorBgContainer : '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      border: isDarkMode ? '1px solid #303030' : '1px solid #e0e0e0',
    }}>
      {/* Header with Sort and View Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <Select
          value={sortBy}
          onChange={setSortBy}
          style={{ width: 160 }}
          size="large"
        >
          <Option value="best-match">Best match</Option>
          <Option value="price-low">Price: Low to High</Option>
          <Option value="price-high">Price: High to Low</Option>
          <Option value="rating">Highest Rated</Option>
        </Select>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type={viewMode === 'grid' ? 'primary' : 'default'}
            icon={<AppstoreOutlined />}
            onClick={() => setViewMode('grid')}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px'
            }}
          />
          <Button
            type={viewMode === 'list' ? 'primary' : 'default'}
            icon={<UnorderedListOutlined />}
            onClick={() => setViewMode('list')}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px'
            }}
          />
        </div>
      </div>

      {/* Products Count */}
      <div style={{
        marginBottom: '16px',
        color: token.colorTextSecondary,
        fontSize: '14px'
      }}>
        Showing {paginatedProducts.length} of {filteredProducts.length} products
      </div>

      {/* Products Grid */}
      <Row gutter={[24, 24]}>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={viewMode === 'grid' ? 12 : 24}
              lg={viewMode === 'grid' ? 8 : 24}
              xl={viewMode === 'grid' ? 8 : 24}
            >
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: token.colorTextSecondary
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No products found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      {filteredProducts.length > pageSize && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '48px',
          marginBottom: '24px'
        }}>
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            showSizeChanger={false}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            style={{
              fontSize: '14px'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;