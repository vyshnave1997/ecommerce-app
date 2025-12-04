'use client';

import React, { useState } from 'react';
import { Checkbox, Radio, Slider, Input, Button, Collapse, theme, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import productsData from '@/data/products.json';

const { Panel } = Collapse;

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  selectedCategory?: string;
}

export interface FilterState {
  category: string;
  brands: string[];
  condition: string;
  priceRange: [number, number];
  ratings: number[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  onFilterChange,
  selectedCategory = 'all'
}) => {
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  // Get all categories from data
  const categories = [
    { id: 'all', name: 'All electronics' },
    ...productsData.categories.map(cat => ({ id: cat.id, name: cat.name }))
  ];

  // Get all unique brands across all categories
  const allBrands = Array.from(
    new Set(
      productsData.categories.flatMap(cat => 
        cat.brands.map(brand => brand.name)
      )
    )
  ).sort();

  const [currentCategory, setCurrentCategory] = useState(selectedCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [condition, setCondition] = useState('any');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('2,000');
  const [selectedRating, setSelectedRating] = useState<number[]>([]);

  const conditions = [
    { label: 'Any condition', value: 'any' },
    { label: 'Brand new', value: 'new' },
    { label: 'Used item', value: 'used' },
    { label: 'Well used', value: 'well-used' },
    { label: 'Old item', value: 'old' }
  ];

  const ratings = [
    { value: 5, label: '5 star' },
    { value: 4, label: '4 star' },
    { value: 3, label: '3 star' },
    { value: 2, label: '2 star' }
  ];

  const handleBrandChange = (checkedValues: string[]) => {
    setSelectedBrands(checkedValues);
    notifyFilterChange({ brands: checkedValues });
  };

  const handleRatingChange = (checkedValues: number[]) => {
    setSelectedRating(checkedValues);
    notifyFilterChange({ ratings: checkedValues });
  };

  const handleCategoryChange = (categoryId: string) => {
    setCurrentCategory(categoryId);
    notifyFilterChange({ category: categoryId });
  };

  const handleConditionChange = (value: string) => {
    setCondition(value);
    notifyFilterChange({ condition: value });
  };

  const handlePriceApply = () => {
    notifyFilterChange({ priceRange });
  };

  const notifyFilterChange = (updates: Partial<FilterState>) => {
    if (onFilterChange) {
      onFilterChange({
        category: currentCategory,
        brands: selectedBrands,
        condition,
        priceRange,
        ratings: selectedRating,
        ...updates
      });
    }
  };

  const renderStars = (count: number) => {
    return '⭐'.repeat(count);
  };

  const sectionTitleStyle = {
    fontSize: '15px',
    fontWeight: 600,
    color: token.colorText,
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const collapseStyle = {
    background: 'transparent',
    border: 'none',
  };

  const panelStyle = {
    marginBottom: '16px',
    background: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    borderRadius: '8px',
    border: 'none',
  };

  return (
    <div style={{
      padding: '20px 20px 20px 0',
      backgroundColor: isDarkMode ? token.colorBgContainer : '#ffffff',
      borderRadius: '8px',
      height: 'fit-content',
    }}>
      <Collapse 
        defaultActiveKey={['1', '2', '3', '4', '5']} 
        ghost
        style={collapseStyle}
        expandIconPosition="end"
      >
        {/* Categories */}
        <Panel 
          header={<div style={sectionTitleStyle}>▼ Categories</div>} 
          key="1"
          style={panelStyle}
          showArrow={false}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                type={currentCategory === category.id ? 'text' : 'text'}
                icon={currentCategory === category.id ? <LeftOutlined /> : null}
                onClick={() => handleCategoryChange(category.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  color: currentCategory === category.id ? (isDarkMode ? '#ffffff' : token.colorPrimary) : token.colorText,
                  backgroundColor: currentCategory === category.id ? (isDarkMode ? '#2a2a2a' : '#e6f4ff') : 'transparent',
                  fontWeight: currentCategory === category.id ? 500 : 400,
                  padding: '8px 12px',
                  height: 'auto',
                  border: 'none'
                }}
              >
                {category.name}
              </Button>
            ))}
          </Space>
        </Panel>

        {/* Brands */}
        <Panel 
          header={<div style={sectionTitleStyle}>▼ Brands</div>} 
          key="2"
          style={panelStyle}
          showArrow={false}
        >
          <Checkbox.Group 
            value={selectedBrands}
            onChange={handleBrandChange}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {allBrands.map((brand) => (
                <Checkbox 
                  key={brand} 
                  value={brand}
                  style={{ color: token.colorText }}
                >
                  {brand}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Panel>

        {/* Condition */}
        <Panel 
          header={<div style={sectionTitleStyle}>▼ Condition</div>} 
          key="3"
          style={panelStyle}
          showArrow={false}
        >
          <Radio.Group 
            value={condition} 
            onChange={(e) => handleConditionChange(e.target.value)}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {conditions.map((cond) => (
                <Radio 
                  key={cond.value} 
                  value={cond.value}
                  style={{ color: token.colorText }}
                >
                  {cond.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Panel>

        {/* Price Range */}
        <Panel 
          header={<div style={sectionTitleStyle}>▼ Price range</div>} 
          key="4"
          style={panelStyle}
          showArrow={false}
        >
          <div>
            <Slider
              range
              value={priceRange}
              min={0}
              max={5000}
              onChange={(value) => {
                setPriceRange(value as [number, number]);
                setMinPrice(value[0].toString());
                setMaxPrice(value[1].toLocaleString());
              }}
              styles={{
                track: { backgroundColor: token.colorPrimary },
                tracks: { backgroundColor: token.colorPrimary }
              }}
            />
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              marginTop: '16px',
              marginBottom: '12px' 
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: token.colorTextSecondary,
                  marginBottom: '4px' 
                }}>
                  Min
                </div>
                <Input
                  value={`$${minPrice}`}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setMinPrice(val);
                    setPriceRange([parseInt(val) || 0, priceRange[1]]);
                  }}
                  style={{ 
                    backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                    borderColor: isDarkMode ? '#303030' : '#d9d9d9'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: token.colorTextSecondary,
                  marginBottom: '4px' 
                }}>
                  Max
                </div>
                <Input
                  value={`$${maxPrice}`}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setMaxPrice(val);
                    setPriceRange([priceRange[0], parseInt(val) || 5000]);
                  }}
                  style={{ 
                    backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                    borderColor: isDarkMode ? '#303030' : '#d9d9d9'
                  }}
                />
              </div>
            </div>
            <Button 
              type="primary" 
              block
              onClick={handlePriceApply}
              style={{
                backgroundColor: token.colorPrimary,
                borderRadius: '6px',
                height: '40px',
                fontWeight: 500
              }}
            >
              Apply
            </Button>
          </div>
        </Panel>

        {/* Rating */}
        <Panel 
          header={<div style={sectionTitleStyle}>▼ Rating</div>} 
          key="5"
          style={panelStyle}
          showArrow={false}
        >
          <Checkbox.Group 
            value={selectedRating}
            onChange={handleRatingChange}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {ratings.map((rating) => (
                <Checkbox 
                  key={rating.value} 
                  value={rating.value}
                  style={{ color: token.colorText }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                    {rating.label} - {renderStars(rating.value)}
                  </span>
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterSidebar;