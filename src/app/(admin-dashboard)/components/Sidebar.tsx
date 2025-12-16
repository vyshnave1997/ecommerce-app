// ============================================
// FILE: app/(admin-dashboard)/components/Sidebar.tsx
// ============================================
'use client';

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DollarOutlined,
  TeamOutlined,
  TagOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  AlipayOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: 'cms',
      icon: <AlipayOutlined />,
      label: <Link href="/cms">CMS</Link>,
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: <Link href="./admin/orders">Orders</Link>,
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: <Link href="/products">Products</Link>,
    },
    {
      key: 'invoices',
      icon: <FileTextOutlined />,
      label: <Link href="/invoices">Invoices</Link>,
    },
    {
      key: 'finance',
      icon: <DollarOutlined />,
      label: <Link href="/finance">Finance</Link>,
    },
    {
      key: 'customers',
      icon: <TeamOutlined />,
      label: <Link href="/customers">Customers</Link>,
    },
    {
      key: 'discounts',
      icon: <TagOutlined />,
      label: <Link href="/discounts">Discounts</Link>,
    },
    {
      key: 'reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
      children: [
        {
          key: 'sales-report',
          label: <Link href="/reports/sales-report">Sales Report</Link>,
        },
        {
          key: 'revenue-report',
          label: <Link href="/reports/revenue-report">Revenue Report</Link>,
        },
        {
          key: 'product-performance',
          label: <Link href="/performance">Product Performance</Link>,
        },
      ],
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
    },
  ];

  return (
    <>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed} 
        theme="dark"
        style={{ 
          backgroundColor: '#000000',
          borderRight: '2px solid #FFD700'
        }}
      >
        <div style={{ 
          padding: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          borderBottom: '2px solid #FFD700',
          marginBottom: '8px',
          backgroundColor: '#FFD700'
        }}>
          <div style={{ 
            width: 32, 
            height: 32, 
            background: '#000000', 
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#FFD700',
            fontSize: '18px'
          }}>
            A
          </div>
          {!collapsed && <span style={{ fontWeight: 600, color: '#FFD700', fontSize: '16px' }}>Admin</span>}
        </div>
        <Menu 
          mode="inline" 
          defaultSelectedKeys={['dashboard']} 
          items={menuItems}
          className="black-yellow-menu"
        />
      </Sider>

      <style jsx global>{`
        /* Sidebar background */
        .ant-layout-sider,
        .ant-layout-sider-collapsed {
          background-color: #000000 !important;
        }
        
        /* Collapsed state - larger icons */
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-item .anticon,
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-submenu-title .anticon {
          font-size: 22px !important;
          color: #FFD700 !important;
        }
        
        /* Force collapsed menu background to black */
        .ant-layout-sider-collapsed .ant-menu,
        .ant-layout-sider-collapsed .ant-menu-inline-collapsed {
          background-color: #000000 !important;
        }
        
        /* Collapsed state - icon colors */
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-item,
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-submenu-title {
          color: #FFD700 !important;
          background-color: transparent !important;
        }
        
        /* Collapsed hover - yellow background, black icons */
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-item:hover,
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-submenu-title:hover {
          background-color: #FFD700 !important;
        }
        
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-item:hover .anticon,
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-submenu-title:hover .anticon {
          color: #000000 !important;
        }
        
        /* Collapsed selected state */
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-item-selected {
          background-color: #FFD700 !important;
        }
        
        .ant-layout-sider-collapsed .black-yellow-menu .ant-menu-item-selected .anticon {
          color: #000000 !important;
        }
        
        /* Zero width trigger (when collapsed) */
        .ant-layout-sider-zero-width-trigger {
          background-color: #000000 !important;
          color: #FFD700 !important;
          border: 2px solid #FFD700 !important;
          top: 16px !important;
        }
        
        .ant-layout-sider-zero-width-trigger:hover {
          background-color: #FFD700 !important;
          color: #000000 !important;
        }

        /* Menu background */
        .black-yellow-menu.ant-menu-dark,
        .black-yellow-menu.ant-menu-inline,
        .black-yellow-menu.ant-menu-inline-collapsed {
          background-color: #000000 !important;
        }

        /* Menu items */
        .black-yellow-menu .ant-menu-item,
        .black-yellow-menu .ant-menu-submenu-title {
          color: #FFD700 !important;
        }

        /* Menu item icons */
        .black-yellow-menu .ant-menu-item .anticon,
        .black-yellow-menu .ant-menu-submenu-title .anticon {
          color: #FFD700 !important;
        }

        /* Hover state */
        .black-yellow-menu .ant-menu-item:hover,
        .black-yellow-menu .ant-menu-submenu-title:hover {
          background-color: #2a2a2a !important;
          color: #FFD700 !important;
        }

        /* Selected item */
        .black-yellow-menu .ant-menu-item-selected {
          background-color: #FFD700 !important;
          color: #000000 !important;
          font-weight: 600 !important;
        }

        .black-yellow-menu .ant-menu-item-selected .anticon {
          color: #000000 !important;
        }

        .black-yellow-menu .ant-menu-item-selected a {
          color: #000000 !important;
        }

        /* Submenu selected */
        .black-yellow-menu .ant-menu-submenu-selected > .ant-menu-submenu-title {
          color: #FFD700 !important;
          background-color: #2a2a2a !important;
        }

        /* Submenu background */
        .black-yellow-menu .ant-menu-sub {
          background-color: #0a0a0a !important;
        }

        /* Submenu items */
        .black-yellow-menu .ant-menu-sub .ant-menu-item {
          color: #FFD700 !important;
        }

        .black-yellow-menu .ant-menu-sub .ant-menu-item:hover {
          background-color: #2a2a2a !important;
          color: #FFD700 !important;
        }

        .black-yellow-menu .ant-menu-sub .ant-menu-item-selected {
          background-color: #FFD700 !important;
          color: #000000 !important;
        }

        /* Link colors */
        .black-yellow-menu a {
          color: inherit !important;
        }

        /* Collapse trigger */
        .ant-layout-sider-trigger {
          background-color: #1a1a1a !important;
          border-top: 2px solid #FFD700 !important;
          color: #FFD700 !important;
        }

        /* Submenu arrow */
        .black-yellow-menu .ant-menu-submenu-arrow {
          color: #FFD700 !important;
        }
      `}</style>
    </>
  );
}