'use client';

import React from 'react';
import { theme, Button } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ProductDetailsLayout from '../../components/ProductDetailsLayout';
import productsData from '@/data/products.json';
import PublicLayout from '../../components/PublicLayout';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  comments: number;
  image: string;
  colors: string[];
  sizes: string[];
  discount?: number;
  brand?: string;
  category?: string;
}

const ProductPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { token } = theme.useToken();
  const isDarkMode = token.colorBgLayout === '#000000' || token.colorBgContainer === '#1f1f1f';

  // Find the product by ID
  const findProduct = (): Product | null => {
    for (const category of productsData.categories) {
      for (const brand of category.brands) {
        const product = brand.products.find(p => p.id === productId);
        if (product) {
          return {
            ...product,
            brand: brand.name,
            category: category.id
          };
        }
      }
    }
    return null;
  };

  const product = findProduct();

  if (!product) {
    return (
      <div style={{
        padding: '60px 20px',
        textAlign: 'center',
        color: token.colorTextSecondary
      }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div >
    
<PublicLayout>
        <ProductDetailsLayout product={product} />
        </PublicLayout>

      {/* </div> */}
    </div>
  );
};

export default ProductPage;