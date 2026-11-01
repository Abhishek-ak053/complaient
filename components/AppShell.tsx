'use client';

import React, { useState, Suspense } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SearchModal } from './SearchModal';
import { SOSModal } from './SOSModal';
import { DispatchModal } from './DispatchModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex flex-col">
      <Suspense fallback={<div className="w-[260px] h-screen bg-surface-container-lowest fixed left-0 top-0" />}>
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
      </Suspense>

      <Suspense fallback={<div className="h-16 bg-surface-container-lowest fixed top-0 left-0 right-0" />}>
        <Header onOpenMobile={() => setMobileSidebarOpen(true)} />
      </Suspense>

      <SearchModal />
      <SOSModal />
      <DispatchModal />

      <main className="w-full pl-0 lg:pl-[260px] pt-16 bg-surface min-h-screen flex-1">
        {children}
      </main>
    </div>
  );
}
