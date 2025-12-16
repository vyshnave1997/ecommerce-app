// ============================================
// FILE: app/(admin-dashboard)/components/SalesChart.tsx
// ============================================
'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Text } = Typography;

const salesData = [
  { month: 'Yan', value: 12 },
  { month: 'Fev', value: 20 },
  { month: 'Mar', value: 18 },
  { month: 'Apr', value: 16 },
  { month: 'May', value: 15 },
  { month: 'Iyun', value: 10 },
  { month: 'Iyu', value: 12 },
  { month: 'Avg', value: 2 },
  { month: 'Sen', value: 3 },
  { month: 'Okt', value: 8 },
  { month: 'Noy', value: 19 },
  { month: 'Dek', value: 3 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #FFD700',
        padding: '8px 12px',
        borderRadius: '4px'
      }}>
        <p style={{ color: '#FFD700', margin: 0, fontWeight: 600 }}>
          {`${payload[0].payload.month}: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function SalesChart() {
  return (
    <Card 
      title={<span style={{ color: '#FFD700' }}>Sales growth chart</span>}
      extra={<Text style={{ color: '#FFD700' }}>Last 12 month</Text>}
      style={{ 
        backgroundColor: '#1a1a1a', 
        borderColor: '#FFD700',
        border: '2px solid #FFD700'
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
          <XAxis 
            dataKey="month" 
            stroke="#FFD700"
            tick={{ fill: '#FFD700' }}
          />
          <YAxis 
            stroke="#FFD700"
            tick={{ fill: '#FFD700' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#2a2a2a' }} />
          <Bar dataKey="value" fill="#FFD700" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}