import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CampusFix - Campus Maintenance & Operations Platform',
  description:
    'Institutional facility operations platform for university campuses: report maintenance problems, track field dispatch crews in real-time, and manage work orders.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AppProvider>
          <Suspense fallback={<div className="min-h-screen bg-surface" />}>
            <AppShell>{children}</AppShell>
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
