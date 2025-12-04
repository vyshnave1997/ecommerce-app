// components/LoaderProvider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && children}
    </>
  );
}