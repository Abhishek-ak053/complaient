'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TicketCategory, TicketPriority } from '@/lib/types';
import { Icon } from '@/components/Icon';

export default function StudentDashboardPage() {
  const { tickets, upvoteTicket } = useApp();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortFilter, setSortFilter] = useState<'newest' | 'upvotes' | 'priority'>('newest');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Counts
  const totalCount = tickets.length;
  const pendingCount = tickets.filter(t => t.status === 'Pending').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  // Filtered & Sorted tickets
  const filteredTickets = useMemo(() => {
    return tickets
      .filter(ticket => {
        const matchesSearch =
          ticket.title.toLowerCase().includes(search.toLowerCase()) ||
          ticket.id.toLowerCase().includes(search.toLowerCase()) ||
          ticket.location.toLowerCase().includes(search.toLowerCase()) ||
          ticket.building.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          categoryFilter === 'all' || ticket.category === categoryFilter;

        const matchesStatus =
          statusFilter === 'all' || ticket.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortFilter === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortFilter === 'priority') {
          const priorityScore: Record<TicketPriority, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return (priorityScore[b.priority] || 0) - (priorityScore[a.priority] || 0);
        }
        // default newest
        return b.id.localeCompare(a.id);
      });
  }, [tickets, search, categoryFilter, statusFilter, sortFilter]);

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setSortFilter('newest');
  };

  const getCategoryIcon = (cat: TicketCategory) => {
    switch (cat) {
      case 'Plumbing':
        return 'water_damage';
      case 'Electrical':
        return 'electric_bolt';
      case 'HVAC':
        return 'ac_unit';
      case 'Furniture':
        return 'chair';
      case 'Wi-Fi / Tech':
        return 'wifi';
      case 'Sanitation':
        return 'cleaning_services';
      default:
        return 'engineering';
    }
  };

  return (
    <div className="w-full px-4 sm:px-space-lg py-space-lg min-h-screen">
      <div className="w-full space-y-space-lg pb-12 max-w-7xl mx-auto">
        {/* Hero / Welcome Banner */}
        <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm border border-surface-container-low">
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute right-40 -bottom-20 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
            <div className="max-w-2xl space-y-space-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-semibold">
                <Icon name="verified" size={15} filled className="text-primary" />
                <span>Hall B Resident Portal • Term Fall 2024</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Welcome back, Alex! 👋
              </h1>
              <p className="font-headline-sm text-headline-sm text-primary-container font-medium">
                Let&apos;s make our campus better.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Report facilities problems, track maintenance crews in real-time, and vote on community repairs across campus spaces.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-space-sm pt-2 lg:pt-0">
              <Link
                href="/report"
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:shadow-md hover:bg-primary transition-all active:scale-95"
              >
                <Icon name="add_circle" size={20} />
                <span>Report an Issue</span>
              </Link>
              <Link
                href="/buildings"
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors"
              >
                <Icon name="explore" size={20} className="text-secondary" />
                <span>Browse Campus Map</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Metric / Statistics Cards (Grid of 4) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Total Reports */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between border border-surface-container-low">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Total Reports
                </p>
                <h3 className="font-headline-xl text-headline-xl text-on-surface mt-1">{totalCount}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="assignment" size={24} />
              </div>
            </div>
            <div className="mt-space-md flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-semibold">
                <Icon name="trending_up" size={16} />
                <span>+2 this month</span>
              </span>
              <span className="text-outline">Lifetime 42</span>
            </div>
          </div>

          {/* Pending Issues */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container-low">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Pending Issues
                </p>
                <h3 className="font-headline-xl text-headline-xl text-on-surface mt-1">{pendingCount}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-secondary-container text-on-secondary-fixed-variant flex items-center justify-center">
                <Icon name="schedule" size={24} />
              </div>
            </div>
            <div className="mt-space-md flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-fixed-variant font-medium">
                Awaiting inspection
              </span>
              <span className="font-label-sm text-label-sm text-outline">Avg ~2 hrs</span>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container-low">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  In Progress
                </p>
                <h3 className="font-headline-xl text-headline-xl text-on-surface mt-1">{inProgressCount}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                <Icon name="engineering" size={24} />
              </div>
            </div>
            <div className="mt-space-md flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed-variant font-medium">
                Crews assigned
              </span>
              <span className="font-label-sm text-label-sm text-outline">Active dispatch</span>
            </div>
          </div>

          {/* Resolved */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container-low">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Resolved
                </p>
                <h3 className="font-headline-xl text-headline-xl text-on-surface mt-1">{resolvedCount}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <Icon name="check_circle" size={24} />
              </div>
            </div>
            <div className="mt-space-md flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-on-tertiary-container text-tertiary font-semibold">
                Completed repairs
              </span>
              <span className="font-label-sm text-label-sm text-outline">98% Satisfaction</span>
            </div>
          </div>
        </section>

        {/* Main Content Area: Reports List + Live Campus Insights Bento */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* Left / Primary Column (Reports list with filters) */}
          <section className="xl:col-span-8 space-y-space-md">
            {/* Filter & Search Action Bar */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-space-sm border border-surface-container-low">
              <div className="flex flex-col sm:flex-row gap-space-sm items-stretch sm:items-center justify-between">
                {/* Search bar */}
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-outline">
                    <Icon name="search" size={20} />
                  </span>
                  <input
                    type="text"
                    id="ticket-search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search reports by title, keyword, or room #..."
                    className="w-full bg-surface-container-low pl-10 pr-10 py-2 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
                    >
                      <Icon name="close" size={16} />
                    </button>
                  )}
                </div>

                {/* Category & Sort selectors */}
                <div className="flex items-center gap-space-xs flex-wrap sm:flex-nowrap">
                  <select
                    id="category-select"
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="bg-surface-container-low text-on-surface font-label-md text-label-md px-3 py-2 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Wi-Fi / Tech">Wi-Fi / Tech</option>
                    <option value="HVAC">HVAC / Cleaning</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Exterior / Grounds">Exterior / Grounds</option>
                  </select>

                  <select
                    id="sort-select"
                    value={sortFilter}
                    onChange={e => setSortFilter(e.target.value as any)}
                    className="bg-surface-container-low text-on-surface font-label-md text-label-md px-3 py-2 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="upvotes">Most Upvoted</option>
                    <option value="priority">High Priority</option>
                  </select>
                </div>
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider pr-1">
                  Filter:
                </span>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`filter-pill px-3 py-1 rounded-full font-label-sm text-label-sm transition-colors shadow-sm ${
                    statusFilter === 'all'
                      ? 'bg-primary-container text-on-primary font-medium'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => setStatusFilter('Pending')}
                  className={`filter-pill px-3 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                    statusFilter === 'Pending'
                      ? 'bg-primary-container text-on-primary font-medium'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setStatusFilter('In Progress')}
                  className={`filter-pill px-3 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                    statusFilter === 'In Progress'
                      ? 'bg-primary-container text-on-primary font-medium'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  In Progress ({inProgressCount})
                </button>
                <button
                  onClick={() => setStatusFilter('Resolved')}
                  className={`filter-pill px-3 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                    statusFilter === 'Resolved'
                      ? 'bg-primary-container text-on-primary font-medium'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  Resolved ({resolvedCount})
                </button>
              </div>
            </div>

            {/* Reports List Container */}
            <div className="space-y-space-sm" id="reports-container">
              {filteredTickets.map(ticket => (
                <div
                  key={ticket.id}
                  className="report-card bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-surface-container-low"
                >
                  <div className="space-y-2 min-w-0 flex-1">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold inline-flex items-center gap-1 ${
                          ticket.status === 'Resolved'
                            ? 'bg-on-tertiary-container text-tertiary'
                            : ticket.status === 'In Progress'
                            ? 'bg-primary-fixed text-on-primary-fixed-variant'
                            : 'bg-secondary-container text-on-secondary-fixed-variant'
                        }`}
                      >
                        <Icon
                          name={
                            ticket.status === 'Resolved'
                              ? 'check_circle'
                              : ticket.status === 'In Progress'
                              ? 'engineering'
                              : 'pending'
                          }
                          size={13}
                        />
                        <span>{ticket.status}</span>
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                          ticket.priority === 'Urgent'
                            ? 'bg-error-container text-on-error-container'
                            : ticket.priority === 'High'
                            ? 'bg-error-container/80 text-on-error-container'
                            : ticket.priority === 'Medium'
                            ? 'bg-secondary-container text-on-secondary-fixed-variant'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {ticket.priority} Priority
                      </span>

                      <span className="font-body-sm text-body-sm text-outline">
                        #{ticket.id} • {ticket.createdAt}
                      </span>
                    </div>

                    {/* Title & Location */}
                    <div>
                      <Link
                        href={`/issues/${ticket.id}`}
                        className="font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors block truncate"
                      >
                        {ticket.title}
                      </Link>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <Icon name="location_on" size={16} className="text-outline" />
                        <span>{ticket.building} • {ticket.location}</span>
                      </p>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="inline-flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded">
                        <Icon name={getCategoryIcon(ticket.category)} size={14} />
                        <span>{ticket.category}</span>
                      </span>

                      {ticket.technician && (
                        <span className="inline-flex items-center gap-1 text-on-surface font-medium">
                          <Icon name="support_agent" size={15} className="text-tertiary" />
                          <span>Tech: {ticket.technician}</span>
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 text-secondary">
                        <Icon name="thumb_up" size={15} />
                        <span>{ticket.upvotes} students verified</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-space-sm pt-2 md:pt-0 border-t md:border-none border-surface-container shrink-0">
                    {ticket.eta && ticket.status !== 'Resolved' && (
                      <div className="flex items-center gap-1 text-primary bg-primary-fixed/50 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold">
                        <Icon name="timer" size={16} />
                        <span>ETA: {ticket.eta}</span>
                      </div>
                    )}
                    {ticket.status === 'Resolved' && (
                      <span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                        Closed Oct 22
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => upvoteTicket(ticket.id)}
                        className={`upvote-btn inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${
                          ticket.userUpvoted
                            ? 'bg-primary-container text-on-primary shadow-sm hover:bg-primary'
                            : 'bg-surface-container text-on-surface hover:bg-secondary-fixed'
                        }`}
                        title="Upvote / Verify Issue"
                      >
                        <Icon name="arrow_upward" size={15} />
                        <span>Upvote ({ticket.upvotes})</span>
                      </button>

                      <Link
                        href={`/issues/${ticket.id}`}
                        className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-primary-container hover:text-on-primary transition-all"
                      >
                        <span>View Details</span>
                        <Icon name="chevron_right" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State Preview */}
              {filteredTickets.length === 0 && (
                <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm text-center flex flex-col items-center justify-center space-y-space-sm py-16 border border-surface-container-low" id="empty-state">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline">
                    <Icon name="manage_search" size={32} />
                  </div>
                  <div className="max-w-sm space-y-1">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">
                      No reports found
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      We couldn&apos;t find any maintenance tickets matching your search query or active
                      filter combination.
                    </p>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors"
                  >
                    Clear Filters & Reset
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Right / Secondary Column: Campus Operations Radar & Micro-Updates (Exact Stitch Bento) */}
          <aside className="xl:col-span-4 space-y-space-md">
            {/* Live Crew Dispatch Status Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="engineering" size={22} className="text-primary" />
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Live Crew Dispatch</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-on-tertiary-container text-tertiary font-label-sm text-label-sm font-semibold">
                  Active
                </span>
              </div>

              {/* Dispatch Timeline Feed */}
              <div className="space-y-space-sm text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-start gap-3 p-space-sm rounded-lg bg-surface-container-low">
                  <img
                    className="w-9 h-9 rounded-full object-cover shadow-sm mt-0.5"
                    alt="Portrait of Dave M."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJZ8dTI_Axr4nK1G2o_P2NAQ_QCuQhk7t_2AEp3XwiJStyRqmdHy7kSgOiemXRv3F1uhux6La2fs_2D2QnFaSlGig6N0neiFEBbjPhUArYvEUhQhMFz8ZS77cPWouVX1pQDJGJ0ArMeaaY42h6XAD4IaE7q6TafMCw-ekaGE4iYEX9Ut4oerNrZdX6fLIVWyd1CqR2aAhXAKKA1NxFLiLByAUULWYIeEELFyKlXVaj"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        Crew #04 (HVAC)
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">Just now</span>
                    </div>
                    <p className="text-on-surface-variant text-body-sm">
                      En route to Warren Hall (Room 304). Replacement motor arrived.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-space-sm rounded-lg bg-surface-container-low">
                  <img
                    className="w-9 h-9 rounded-full object-cover shadow-sm mt-0.5"
                    alt="Portrait of Sarah K."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6bCjh7MbGcqDXta2EIOvEGrn9qHgVpfTgKc2GQPUq6dzFQdCEEAB73wEwUgAYaLV0ZXhzkO-Y6WzG5a2MerHdVGK2Z7J0VlSJyKidTbI-BYH412BNWudrvKJfQG_BVcxrCeh8caadkPedMQwAOY6h9zi395UvQ16i9IJoe-tr7Z-pywiWho9GJTXCIpZ-RmbVAYXjgmzGPrc-tEtYxtpKWzdqPB3wv-Y4H67YGI10"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        Crew #02 (Tech/IT)
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">28m ago</span>
                    </div>
                    <p className="text-on-surface-variant text-body-sm">
                      Configuring dining hall repeater nodes for high peak load.
                    </p>
                  </div>
                </div>
              </div>

              {/* Campus Maintenance Health / Gauge Visual */}
              <div className="pt-2 border-t border-surface-container space-y-2">
                <div className="flex justify-between items-center text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Daily Campus SLA Compliance</span>
                  <span className="font-semibold text-tertiary">94.2%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className="bg-tertiary-container h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
                <p className="font-label-sm text-label-sm text-outline">
                  18 of 21 urgent repairs closed within under 4 hours.
                </p>
              </div>
            </div>

            {/* Hall B Resident Advisory Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="campaign" size={22} className="text-secondary" />
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Resident Advisory</h3>
                </div>
                <span className="font-label-sm text-label-sm text-outline">Hall B</span>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-surface-container-low p-space-md space-y-2">
                <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md font-semibold">
                  <Icon name="water_drop" size={18} className="text-primary" />
                  <span>Scheduled Boiler Inspection</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Hot water maintenance is planned for Thursday, 6:00 AM - 8:30 AM across floors 2 through 5. Tap cold water only during this window.
                </p>
              </div>

              {/* Quick FAQ / Safety Action Links */}
              <div className="space-y-1 font-label-md text-label-md">
                <Link
                  href="/report"
                  className="flex items-center justify-between p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="help_outline" size={18} className="text-outline" />
                    <span>How are upvotes prioritized?</span>
                  </span>
                  <Icon name="chevron_right" size={16} />
                </Link>
                <Link
                  href="/report"
                  className="flex items-center justify-between p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="emergency" size={18} className="text-outline" />
                    <span>Facilities Emergency Protocols</span>
                  </span>
                  <Icon name="chevron_right" size={16} />
                </Link>
              </div>
            </div>

            {/* Campus Energy & Sustainability Tip Card */}
            <div className="bg-primary/5 rounded-xl p-space-md flex items-center gap-space-md border border-primary/10">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <Icon name="energy_savings_leaf" size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="font-label-md text-label-md font-semibold text-on-surface">Campus Green Tip</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Reporting dripping faucets saves up to 3,000 gallons per dorm floor each semester. Good job!
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
