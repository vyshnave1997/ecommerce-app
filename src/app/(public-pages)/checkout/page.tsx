'use client';

import React from 'react';
import PublicLayout from '../components/PublicLayout';
import CheckoutLayout from '../components/CheckoutLayout';

const CheckoutPage: React.FC = () => {
  return (
    <PublicLayout>
      <CheckoutLayout />
    </PublicLayout>
  );
};

export default CheckoutPage;