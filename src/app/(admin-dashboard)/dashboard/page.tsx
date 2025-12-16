'use client';
// ============================================
// FILE: app/(admin-dashboard)/dashboard/page.tsx
// ============================================
import React from 'react';
import { Card, Row, Col, Statistic, Select, Button, Space, Typography } from 'antd';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import SalesChart from '../components/SalesChart';
import TopProducts from '../components/TopProducts';

const { Title, Text } = Typography;

export default function DashboardPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      padding: '24px' 
    }}>
      <div style={{ 
        marginBottom: 20, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Title level={3} style={{ margin: 0, color: '#FFD700' }}>Dashboard</Title>
        <Space>
          <Select 
            defaultValue="This month" 
            style={{ width: 150 }}
            className="black-yellow-select"
          >
            <Select.Option value="This month">This month</Select.Option>
            <Select.Option value="Last month">Last month</Select.Option>
            <Select.Option value="This year">This year</Select.Option>
          </Select>
          <Button 
            style={{ 
              backgroundColor: '#FFD700', 
              borderColor: '#FFD700', 
              color: '#000000',
              fontWeight: 600
            }}
          >
            Export data
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            backgroundColor: '#1a1a1a', 
            borderColor: '#FFD700',
            border: '2px solid #FFD700'
          }}>
            <Statistic
              title={<span style={{ color: '#FFD700' }}>Total orders</span>}
              value={45}
              valueStyle={{ color: '#FFFFFF' }}
              prefix={<ShoppingCartOutlined style={{ color: '#FFD700' }} />}
            />
            <Text style={{ fontSize: 12, color: '#52c41a' }}>
              <ArrowUpOutlined /> +9% from last period
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            backgroundColor: '#1a1a1a', 
            borderColor: '#FFD700',
            border: '2px solid #FFD700'
          }}>
            <Statistic
              title={<span style={{ color: '#FFD700' }}>Gross Sale</span>}
              value={31700}
              valueStyle={{ color: '#FFFFFF' }}
              prefix="$"
              suffix={<DollarOutlined style={{ color: '#FFD700' }} />}
            />
            <Text style={{ fontSize: 12, color: '#52c41a' }}>
              <ArrowUpOutlined /> +3% from last period
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            backgroundColor: '#1a1a1a', 
            borderColor: '#FFD700',
            border: '2px solid #FFD700'
          }}>
            <Statistic
              title={<span style={{ color: '#FFD700' }}>Leads & visits</span>}
              value={45901}
              valueStyle={{ color: '#FFFFFF' }}
              prefix={<TeamOutlined style={{ color: '#FFD700' }} />}
            />
            <Text style={{ fontSize: 12, color: '#ff4d4f' }}>
              <ArrowDownOutlined /> -3% from last period
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            backgroundColor: '#1a1a1a', 
            borderColor: '#FFD700',
            border: '2px solid #FFD700'
          }}>
            <Statistic
              title={<span style={{ color: '#FFD700' }}>Returning customers</span>}
              value={45}
              valueStyle={{ color: '#FFFFFF' }}
              prefix={<UserOutlined style={{ color: '#FFD700' }} />}
            />
            <Text style={{ fontSize: 12, color: '#52c41a' }}>
              <ArrowUpOutlined /> +9% from last period
            </Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <SalesChart />
        </Col>
        <Col xs={24} lg={10}>
          <TopProducts />
        </Col>
      </Row>

      <style jsx global>{`
        .black-yellow-select .ant-select-selector {
          background-color: #1a1a1a !important;
          border-color: #FFD700 !important;
          color: #FFD700 !important;
        }
        .black-yellow-select .ant-select-arrow {
          color: #FFD700 !important;
        }
      `}</style>
    </div>
  );
}