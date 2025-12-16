'use client';

import React from 'react';
import PublicLayout from '../components/PublicLayout';
import OrderLayout from './components/OrderLayout';

const OrderPage: React.FC = () => {
  return (
    <PublicLayout>
      <OrderLayout />
    </PublicLayout>
  );
};

export default OrderPage;