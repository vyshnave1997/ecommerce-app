'use client';
// ============================================
// FILE: app/(admin-dashboard)/products/new/page.tsx
// ============================================
import React from 'react';
import { Form, Input, Button, Select, InputNumber, Upload, Card, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

export default function NewProductPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Title level={3}>Add New Product</Title>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select category!' }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="beverages">Beverages</Select.Option>
              <Select.Option value="electronics">Electronics</Select.Option>
              <Select.Option value="food">Food</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              prefix="$"
              placeholder="0.00"
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stock"
            rules={[{ required: true, message: 'Please input stock!' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="0" min={0} />
          </Form.Item>

          <Form.Item label="Product Image" name="image">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Product
            </Button>
            <Button style={{ marginLeft: 8 }}>Cancel</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}