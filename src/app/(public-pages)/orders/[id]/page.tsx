'use client';

import React from 'react';
import { use } from 'react';
import PublicLayout from '../../components/PublicLayout';
import OrderDetailLayout from '../components/OrderDetailLayout';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ params }) => {
  const { id } = use(params);
  
  return (
    <PublicLayout>
      <OrderDetailLayout orderId={id} />
    </PublicLayout>
  );
};

export default OrderDetailPage;