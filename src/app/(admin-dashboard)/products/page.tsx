'use client';
import React from 'react';
import { Button, Table, Space, Tag, Typography, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function ProductsPage() {
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Bonaqua water 2 litres',
      category: 'Beverages',
      price: '$2.50',
      stock: 794,
      status: 'Active',
    },
    {
      key: '2',
      name: 'Coca cola classic 0.5 litr',
      category: 'Beverages',
      price: '$1.50',
      stock: 138,
      status: 'Active',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>Products</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Product
        </Button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}