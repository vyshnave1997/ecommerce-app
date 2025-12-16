'use client';
// ============================================
// FILE: app/(admin-dashboard)/orders/page.tsx
// ============================================
import React from 'react';
import { Table, Tag, Space, Typography, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function OrdersPage() {
  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Completed' ? 'green' : status === 'Pending' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>View</a>
          <a>Edit</a>
        </Space>
      ),
    },
  ];

  const data = [
    { key: '1', id: '#1001', customer: 'John Doe', date: '2025-01-15', total: '$150.00', status: 'Completed' },
    { key: '2', id: '#1002', customer: 'Jane Smith', date: '2025-01-16', total: '$200.00', status: 'Pending' },
  ];

  return (
    <div>
      <Title level={3}>Orders</Title>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Search orders..." prefix={<SearchOutlined />} style={{ width: 300 }} />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}