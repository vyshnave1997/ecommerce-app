// app/page.tsx
// Main home page with hero, deals, and product recommendations

'use client';

import React, { useState } from 'react';
import PublicLayout from '../(public-pages)/components/PublicLayout';
import Hero from '../(public-pages)/components/Hero';
import DealsSection from '../(public-pages)/components/DealsSection';
import ProductGrid from '../(public-pages)/components/ProductGrid';
import {
  BulbOutlined,
  CoffeeOutlined,
  GiftOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import DealsOffers from './components/DealCatagories';
import SupplierQuoteForm from './components/EnquiryForm';
import Banner from './components/Banners';
import Loader from './components/Loader';

// Type definitions
interface Product {
  id: number;
  icon: React.ReactNode;
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader onLoadComplete={() => setLoading(false)} />
      ) : (
        <PublicLayout>
          <Hero />
          <DealsSection />
          <DealsOffers />
          <Banner />
          <ProductGrid />
          <SupplierQuoteForm />
        </PublicLayout>
      )}
    </>
  );
}