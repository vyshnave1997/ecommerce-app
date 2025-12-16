'use client';
// ============================================
// FILE: app/(admin-dashboard)/products/[id]/edit/page.tsx
// ============================================
import React from 'react';
import { Form, Input, Button, Select, InputNumber, Card, Typography } from 'antd';

const { Title } = Typography;

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [form] = Form.useForm();

  return (
    <div>
      <Title level={3}>Edit Product #{params.id}</Title>
      <Card>
        <Form form={form} layout="vertical" initialValues={{ name: 'Sample Product' }}>
          <Form.Item label="Product Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber style={{ width: '100%' }} prefix="$" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}