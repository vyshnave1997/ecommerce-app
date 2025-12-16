'use client';

import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  ShoppingOutlined,
  EnvironmentOutlined,
  LockOutlined,
  CreditCardOutlined,
  InboxOutlined,
  HeartOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import MyOrders from './MyOrders';
import YourAddresses from './YourAddresses';
import LoginSecurity from './LoginSecurity';
import Payments from './Payments';
import ArchivedOrders from './ArchivedOrders';
import SavedItems from './SavedItems';
import CustomerSupport from './CustomerSupport';

const { Sider, Content } = Layout;

const AccountLayout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('orders');
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  const menuItems = [
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: 'My orders',
    },
    {
      key: 'addresses',
      icon: <EnvironmentOutlined />,
      label: 'Your addresses',
    },
    {
      key: 'security',
      icon: <LockOutlined />,
      label: 'Login & security',
    },
    {
      key: 'payments',
      icon: <CreditCardOutlined />,
      label: 'Payments',
    },
    {
      key: 'archived',
      icon: <InboxOutlined />,
      label: 'Archived orders',
    },
    {
      key: 'saved',
      icon: <HeartOutlined />,
      label: 'Saved items',
    },
    {
      type: 'divider' as const,
      key: 'divider1',
    },
    {
      key: 'support',
      icon: <CustomerServiceOutlined />,
      label: 'Customer support',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Log out',
    },
  ];

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      console.log('Logging out...');
      return;
    }
    setSelectedMenu(key);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'orders':
        return <MyOrders />;
      case 'addresses':
        return <YourAddresses />;
      case 'security':
        return <LoginSecurity />;
      case 'payments':
        return <Payments />;
      case 'archived':
        return <ArchivedOrders />;
      case 'saved':
        return <SavedItems />;
      case 'support':
        return <CustomerSupport />;
      default:
        return <MyOrders />;
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700, 
          color: token.colorTextHeading,
          marginBottom: '8px'
        }}>
          Your Account
        </h1>
        <p style={{ 
          fontSize: '14px', 
          color: token.colorTextSecondary,
          margin: 0
        }}>
          Alex John, Email: alexjohn@gmail.com
        </p>
      </div>

      <Layout style={{ 
        backgroundColor: 'transparent',
        gap: '24px'
      }}>
        <Sider
          width={280}
          style={{
            backgroundColor: token.colorBgContainer,
            borderRadius: '12px',
            border: `1px solid ${isDarkMode ? '#303030' : '#e0e0e0'}`,
            padding: '12px 0'
          }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            onClick={({ key }) => handleMenuClick(key)}
            items={menuItems}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '15px'
            }}
          />
        </Sider>

        <Content style={{ flex: 1, minWidth: 0 }}>
          {renderContent()}
        </Content>
      </Layout>
    </div>
  );
};

export default AccountLayout;