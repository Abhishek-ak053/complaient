'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Icon } from './Icon';

interface HeaderProps {
  onOpenMobile?: () => void;
}

export function Header({ onOpenMobile }: HeaderProps) {
  const pathname = usePathname();
  const { notifications, markNotificationsRead, setIsSearchOpen, setIsSOSOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getBreadcrumbTitle = () => {
    if (pathname === '/') return 'Operations Platform';
    if (pathname.startsWith('/report')) return 'Report Issue';
    if (pathname.startsWith('/staff')) return 'Staff Operations';
    if (pathname.startsWith('/issues')) return 'Issue Details';
    if (pathname.startsWith('/buildings')) return 'Buildings & Assets';
    return 'Operations Platform';
  };

  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg border-b border-surface-container-low">
      {/* Left Breadcrumb & Mobile Menu Toggle */}
      <div className="flex items-center gap-space-sm font-label-md text-label-md text-on-surface-variant">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-1.5 -ml-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          title="Open Navigation"
        >
          <Icon name="more_horiz" size={22} />
        </button>

        <Link
          href="/"
          className="flex items-center gap-1 hover:text-on-surface cursor-pointer transition-colors"
        >
          <Icon name="home" size={18} />
          <span>CampusFix</span>
        </Link>
        <span>/</span>
        <span className="text-on-surface font-medium truncate max-w-[150px] sm:max-w-none">
          {getBreadcrumbTitle()}
        </span>
      </div>

      {/* Global Quick Search Input (⌘K trigger) */}
      <div
        onClick={() => setIsSearchOpen(true)}
        className="hidden md:flex items-center bg-surface-container-low px-space-md py-1.5 rounded-lg w-96 max-w-md text-on-surface-variant focus-within:ring-2 focus-within:ring-primary-container focus-within:bg-surface-container-lowest transition-all cursor-pointer"
      >
        <Icon name="search" size={20} className="mr-space-sm text-outline" />
        <span className="bg-transparent border-none outline-none font-body-sm text-body-sm w-full text-outline select-none">
          Quick search tickets, buildings, personnel...
        </span>
        <kbd className="font-label-sm text-label-sm bg-surface-container-lowest text-on-surface-variant px-1.5 py-0.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)] ml-space-sm whitespace-nowrap">
          ⌘ K
        </kbd>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-space-md">
        {/* Mobile search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
        >
          <Icon name="search" size={20} />
        </button>

        {/* SOS Hotline Callout */}
        <button
          onClick={() => setIsSOSOpen(true)}
          className="flex items-center gap-1.5 bg-error-container text-on-error-container px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold hover:bg-error hover:text-on-error transition-all shadow-sm"
        >
          <Icon name="phone_in_talk" size={16} />
          <span className="hidden sm:inline">SOS: (555) 0199</span>
          <span className="sm:hidden">SOS</span>
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            <Icon name="notifications" size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-on-error font-label-sm text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-surface-container-lowest shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] border border-surface-container p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-low mb-2">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markNotificationsRead}
                    className="font-label-sm text-label-sm text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    className="p-2.5 rounded-lg bg-surface hover:bg-surface-container-low transition-colors flex items-start gap-2.5"
                  >
                    <Icon
                      name={notif.type === 'alert' ? 'warning' : notif.type === 'resolve' ? 'check_circle' : 'notifications'}
                      size={18}
                      className={notif.type === 'alert' ? 'text-error' : notif.type === 'resolve' ? 'text-tertiary' : 'text-primary'}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                          {notif.title}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline ml-2 whitespace-nowrap">
                          {notif.time}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                        {notif.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile matching Stitch */}
        <div className="relative">
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-space-sm pl-space-sm cursor-pointer select-none"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_ip5knEs3_zeH4G5VcXbv-FvwwLQBOcgLy2YPjbKXLGnx5wWTeFBpYKhWI5JBgiuSmYJZaRj4TH4JwB3gHV_8dN0pDHaWU2fQKzU46P540EJQeTSHfGobGLA3nx6AeLaIivNaTTVmbvjkJFH8D-D0x3Q1TCU-1-XeXmXzL8Kaoo7TfUVK3OclfHhy7OQ96HphJwcEpkp8qe-T0WlNX7a7uBe8LETRr9IhfqCeJs9q"
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                Alex Rivera
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                Student Resident (Hall B)
              </span>
            </div>
            <Icon name="expand_more" size={18} className="text-outline" />
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-container-lowest shadow-lg border border-surface-container p-2 z-50">
              <div className="px-3 py-2 border-b border-surface-container-low mb-1">
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline block">
                  Signed in as
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  Alex Rivera
                </span>
              </div>
              <Link
                href="/"
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container"
              >
                <Icon name="dashboard" size={16} />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/report"
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container"
              >
                <Icon name="add_circle" size={16} />
                <span>Report Issue</span>
              </Link>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setIsSOSOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left font-body-sm text-body-sm text-error hover:bg-error-container/20"
              >
                <Icon name="phone_in_talk" size={16} />
                <span>Emergency SOS</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
