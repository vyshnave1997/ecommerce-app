// app/(admin-dashboard)/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Button, message } from 'antd';
import { 
  ShoppingOutlined, 
  UserOutlined, 
  DollarOutlined, 
  ShoppingCartOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Get current user data
    const loadUserData = async () => {
      const { getCurrentUser } = await import('../../utils/auth');
      const user = getCurrentUser();
      
      if (!user || !user.isAdmin) {
        message.error('Unauthorized access');
        router.push('/auth/login');
        return;
      }
      
      setUserData(user);
    };

    loadUserData();
  }, [router]);

  const handleLogout = async () => {
    const { logout } = await import('../../utils/auth');
    logout();
    message.success('Logged out successfully');
    router.push('/auth/login');
  };

  if (!userData) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'white',
              margin: 0,
              marginBottom: '8px'
            }}>
              Admin Dashboard
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              margin: 0
            }}>
              Welcome back, {userData.name}!
            </p>
          </div>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            size="large"
            style={{
              borderRadius: '8px',
              height: '44px'
            }}
          >
            Logout
          </Button>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            >
              <Statistic
                title="Total Orders"
                value={1234}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            >
              <Statistic
                title="Total Users"
                value={567}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            >
              <Statistic
                title="Revenue"
                value={45678}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#cf1322' }}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            >
              <Statistic
                title="Products"
                value={89}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Info Card */}
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            marginTop: '24px'
          }}
        >
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '16px'
          }}>
            Admin Information
          </h2>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <p style={{ marginBottom: 0 }}><strong>Status:</strong> Active</p>
        </Card>

        {/* Quick Actions */}
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            marginTop: '24px'
          }}
        >
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '16px'
          }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <Button type="primary" size="large">
              Manage Products
            </Button>
            <Button size="large">
              View Orders
            </Button>
            <Button size="large">
              Manage Users
            </Button>
            <Button size="large">
              Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;