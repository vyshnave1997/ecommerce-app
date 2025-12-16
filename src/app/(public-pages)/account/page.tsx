'use client';

import React from 'react';
import PublicLayout from '../components/PublicLayout';
import AccountLayout from './components/AccountLayout';

const AccountPage: React.FC = () => {
  return (
    <PublicLayout>
      <AccountLayout />
    </PublicLayout>
  );
};

export default AccountPage;