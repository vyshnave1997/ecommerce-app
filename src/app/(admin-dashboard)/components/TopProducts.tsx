// ============================================
// FILE: app/(admin-dashboard)/components/TopProducts.tsx
// ============================================
'use client';

import React from 'react';
import { Card, Table, Button, Typography } from 'antd';

const { Text } = Typography;

const topProducts = [
  { key: '1', rank: 1, product: '📦 Bonaqua water 2 litres', quantity: '794 pcs', revenue: '$28,967' },
  { key: '2', rank: 2, product: '📦 Coca cola classic 0.5 litr', quantity: '138 pcs', revenue: '$8,710' },
  { key: '3', rank: 3, product: '📦 Samsung Galaxy S27 Black', quantity: '124 pcs', revenue: '$710' },
  { key: '4', rank: 4, product: '📦 Milter yogi semechka 2 litrs', quantity: '113 pcs', revenue: '$3,811' },
  { key: '5', rank: 5, product: '📦 Bounty trio large', quantity: '98 pcs', revenue: '$1,891' },
];

export default function TopProducts() {
  const columns = [
    { 
      title: '', 
      dataIndex: 'rank', 
      key: 'rank', 
      width: 50,
      render: (text: number) => <span style={{ color: '#FFD700', fontWeight: 600 }}>{text}</span>
    },
    { 
      title: '', 
      dataIndex: 'product', 
      key: 'product',
      render: (text: string) => <span style={{ color: '#FFFFFF' }}>{text}</span>
    },
    { 
      title: '', 
      dataIndex: 'quantity', 
      key: 'quantity', 
      align: 'right' as const,
      render: (text: string) => <span style={{ color: '#FFD700' }}>{text}</span>
    },
    { 
      title: '', 
      dataIndex: 'revenue', 
      key: 'revenue', 
      align: 'right' as const,
      render: (text: string) => <span style={{ color: '#FFD700', fontWeight: 600 }}>{text}</span>
    },
  ];

  return (
    <Card 
      title={<span style={{ color: '#FFD700' }}>Top selling products</span>}
      extra={<Text style={{ color: '#FFD700' }}>From 2025 Jan - 2025 Dec</Text>}
      style={{ 
        backgroundColor: '#1a1a1a', 
        borderColor: '#FFD700',
        border: '2px solid #FFD700',
        height: '100%'
      }}
    >
      <Table 
        columns={columns} 
        dataSource={topProducts} 
        pagination={false} 
        showHeader={false} 
        size="small"
        className="black-yellow-table"
      />
      <Button 
        type="link" 
        style={{ 
          marginTop: 16, 
          padding: 0,
          color: '#FFD700',
          fontWeight: 600
        }}
      >
        View more
      </Button>

      <style jsx global>{`
        .black-yellow-table .ant-table {
          background-color: #1a1a1a !important;
        }
        .black-yellow-table .ant-table-tbody > tr {
          background-color: #1a1a1a !important;
        }
        .black-yellow-table .ant-table-tbody > tr:hover > td {
          background-color: #2a2a2a !important;
        }
        .black-yellow-table .ant-table-cell {
          border-bottom: 1px solid #333333 !important;
        }
      `}</style>
    </Card>
  );
}