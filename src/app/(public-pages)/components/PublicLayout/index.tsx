// components/PublicLayout.tsx
// Main layout wrapper with theme provider and persistent dark mode

'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LoaderProvider from '../LoaderProvider';


interface PublicLayoutProps {
  children: ReactNode; // Page content to be wrapped by the layout
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load saved theme preference from localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    // Toggle theme and save to localStorage for persistence
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
   <LoaderProvider>
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#000000',
          colorBgContainer: darkMode ? '#1a1a1a' : '#ffffff',
          colorText: darkMode ? '#ffffff' : '#000000',
          borderRadius: 8,
        },
      }}
    >
      <div style={{
        background: darkMode ? '#1a1a1a' : '#f5f5f5',
        color: darkMode ? '#ffffff' : '#000000',
        minHeight: '100vh'
      }}>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem' }}>
          {children}
        </main>
        <Footer />
      </div>
    </ConfigProvider>
    </LoaderProvider>
  );
};

export default PublicLayout;