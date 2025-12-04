// app/layout.tsx
// Root layout with required HTML structure

import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Brandname - E-commerce Store',
  description: 'Your trusted online shopping destination',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}