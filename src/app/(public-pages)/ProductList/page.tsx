// app/ProductList/page.tsx
'use client';

import React from 'react';
import { theme } from 'antd';
import PublicLayout from '../components/PublicLayout';
import ProductsPageLayout from '../components/ProductListLayout';

const ProductListPage = () => {
  const { token } = theme.useToken();
  
  const isDarkMode = token.colorBgLayout === '#000000' || 
                     token.colorBgContainer === '#1f1f1f';

  return (
    <PublicLayout>
      <ProductsPageLayout 
        initialCategory="all"
        showCategoryCards={true} 
      />
    </PublicLayout>
  );
};

export default ProductListPage;