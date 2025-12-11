// app/layout.tsx
// Root layout with required HTML structure

import type { Metadata } from 'next';
import '@/styles/globals.scss';
import Providers from './Providers';

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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}