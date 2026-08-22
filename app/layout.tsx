import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-MALL PAKISTAN | Digital Mall Platform',
  description: "Pakistan's 1st consolidated digital mall platform. Endless Brands. One Easy Checkout.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M8 32V8H22C25.3137 8 28 10.6863 28 14C28 17.3137 25.3137 20 22 20H14" stroke="%23C8521B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 20V32M14 20H24C27.3137 20 30 22.6863 30 26C30 29.3137 27.3137 32 24 32H8" stroke="%231A1816" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="10" r="3" fill="%23D49A37"/></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M8 32V8H22C25.3137 8 28 10.6863 28 14C28 17.3137 25.3137 20 22 20H14" stroke="%23C8521B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 20V32M14 20H24C27.3137 20 30 22.6863 30 26C30 29.3137 27.3137 32 24 32H8" stroke="%231A1816" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="10" r="3" fill="%23D49A37"/></svg>'
        />
      </head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}