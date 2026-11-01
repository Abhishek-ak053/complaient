'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Icon } from './Icon';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { currentView, toggleView, tickets } = useApp();

  const urgentCount = tickets.filter(t => t.priority === 'Urgent' && t.status !== 'Resolved').length;

  const navItems = [
    {
      label: 'Student Dashboard',
      href: '/',
      icon: 'dashboard',
      badge: 'Active',
      badgeClass: 'bg-surface-container text-on-surface'
    },
    {
      label: 'Report Issue',
      href: '/report',
      icon: 'add_circle',
      badge: 'New',
      badgeClass: 'bg-secondary-container text-on-secondary-fixed-variant'
    },
    {
      label: 'Staff Operations',
      href: '/staff',
      icon: 'security',
      badge: `${urgentCount} Urgent`,
      badgeClass: 'bg-error-container text-on-error-container'
    },
    {
      label: 'Issue Details',
      href: '/issues/CF-2024-8841',
      icon: 'description',
      badge: null
    },
    {
      label: 'Buildings & Assets',
      href: '/buildings',
      icon: 'apartment',
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[260px] bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1">
          {/* Header & Logo matching Stitch */}
          <div className="h-16 px-space-lg flex items-center justify-between gap-space-sm bg-surface-container-lowest">
            <Link href="/" className="flex items-center gap-space-sm" onClick={onCloseMobile}>
              <img
                alt="CampusFix Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UgZCj5W0yAJOKRRBde2qlUzYX-dYpMk6m0gkV7QTTMFManQv7aJcgD1Yq-MVnvmaYg3up_MIJHgedGDCy7jvvSsk8-2HfIaZuAGLM5fo1MALx7ZmX4L7SYjS6NmwZdW0_I_bQLmpNsLcyEJOikF00xbV04y0tb9yrDVLXTDuc8KXt33JXVdnCSUosgEWmFWtoR-negYaDcliqIYp8mSYPwQp63TEcyGM1SJ4RHin8YwQ"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
                  CampusFix
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                  Facility Operations
                </span>
              </div>
            </Link>

            {/* Mobile close */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-lg hover:bg-surface-container text-outline"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="px-space-md py-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline px-space-sm font-semibold">
              Operations Menu
            </span>
          </div>

          {/* Navigation Links matching Stitch */}
          <nav className="flex flex-col gap-space-xs px-space-sm flex-1">
            {navItems.map(item => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || (item.href.includes('/issues') && pathname.includes('/issues'));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-space-sm py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-label-lg rounded-lg shadow-sm'
                      : 'font-body-md text-body-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <Icon name={item.icon} size={20} className={isActive ? 'text-on-primary' : 'text-on-surface-variant'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${
                        isActive ? 'bg-surface-container text-on-surface' : item.badgeClass
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Services Status matching Stitch */}
        <div className="p-space-md bg-surface-container-low flex flex-col gap-space-sm">
          <div className="flex items-center justify-between bg-surface-container-lowest p-space-sm rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-space-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed-dim opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-medium">
                Campus Services
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-tertiary font-semibold">
              Operational
            </span>
          </div>

          <button
            onClick={toggleView}
            className="w-full flex items-center justify-center gap-space-xs py-1.5 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-sm text-label-sm transition-colors shadow-sm"
          >
            <Icon name="sync_alt" size={16} />
            <span>Switch View Mode ({currentView === 'student' ? 'Staff' : 'Student'})</span>
          </button>
        </div>
      </aside>
    </>
  );
}
