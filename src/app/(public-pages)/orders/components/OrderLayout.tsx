'use client';

import React, { useState, useEffect } from 'react';
import { Button, Menu, theme } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import OrderList from './OrderList';
import productsData from '@/data/products.json';

// Helper to get random products from JSON
const getRandomProducts = (count: number) => {
  const allProducts: any[] = [];
  productsData.categories.forEach((category: any) => {
    category.brands.forEach((brand: any) => {
      brand.products.forEach((product: any) => {
        allProducts.push({
          ...product,
          categoryName: category.name,
          brandName: brand.name
        });
      });
    });
  });
  
  const shuffled = allProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate mock orders with real products
const generateMockOrders = () => {
  const statuses = [
    { status: 'On the way', color: 'orange', category: 'current' },
    { status: 'Processing', color: 'blue', category: 'current' },
    { status: 'Pending Payment', color: 'red', category: 'unpaid' },
    { status: 'Delivered', color: 'green', category: 'completed' },
  ];

  return Array.from({ length: 5 }, (_, i) => {
    const statusInfo = statuses[i % statuses.length];
    const productsInOrder = getRandomProducts(Math.floor(Math.random() * 3) + 2);
    
    return {
      id: 73262 - i,
      products: productsInOrder.length,
      createdBy: 'Alex John',
      createdAt: `${10 + i}:${30 + i * 5}, Nov ${10 + i}, 2025`,
      status: statusInfo.status,
      deliveryDate: `${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7]}, ${13 + i} Nov, 2025`,
      deliveredTo: 'Great street, New York Brooklyn 5A, PO: 212891',
      total: productsInOrder.reduce((sum, p) => sum + (p.price * (1 - (p.discount || 0) / 100)), 0),
      statusColor: statusInfo.color,
      category: statusInfo.category,
      productImages: productsInOrder.map(p => p.image),
      items: productsInOrder
    };
  });
};

const OrderLayout: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('current');
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  useEffect(() => {
    setOrders(generateMockOrders());
  }, []);

  const filteredOrders = selectedTab === 'all' 
    ? orders 
    : orders.filter(order => order.category === selectedTab);

  const menuItems = [
    { key: 'current', label: 'Current' },
    { key: 'unpaid', label: 'Unpaid' },
    { key: 'completed', label: 'Completed' },
    { key: 'all', label: 'All orders' }
  ];

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '24px'
    }}>
      <div style={{  }}>
   
        <style jsx>{`
          .dark-mode-button { color: #ffffff !important; }
          .dark-mode-button:hover {
            background-color: rgba(255, 255, 255, 0.08) !important;
            color: #5f63f2 !important;
          }
          .dark-mode-button :global(svg) { color: #ffffff !important; }
          .dark-mode-button :global(span) { color: #ffffff !important; }
          .dark-mode-button:hover :global(span) { color: #5f63f2 !important; }
          .light-mode-button { color: #000000 !important; }
          .light-mode-button:hover {
            background-color: rgba(0, 0, 0, 0.04) !important;
            color: #5f63f2 !important;
          }
          .light-mode-button :global(span) { color: #000000 !important; }
          .light-mode-button:hover :global(span) { color: #5f63f2 !important; }
        `}</style>
      </div>

      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: token.colorTextHeading,
        margin: '0 0 24px 0',
        transition: 'color 0.3s ease',
      }}>
        Orders
      </h2>

      <Menu
        mode="horizontal"
        selectedKeys={[selectedTab]}
        items={menuItems}
        onClick={({ key }) => setSelectedTab(key)}
        style={{ 
          marginBottom: '24px',
          borderBottom: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
          backgroundColor: 'transparent',
          transition: 'all 0.3s ease',
        }}
      />

      <OrderList orders={filteredOrders} selectedTab={selectedTab} />
    </div>
  );
};

export default OrderLayout;