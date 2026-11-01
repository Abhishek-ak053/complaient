'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TicketStatus, TicketPriority } from '@/lib/types';
import { Icon } from '@/components/Icon';

export default function StaffOperationsPage() {
  const {
    tickets,
    technicians,
    updateTicketStatus,
    assignTechnician,
    addActivityLog,
    setIsDispatchModalOpen
  } = useApp();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusTab, setStatusTab] = useState<'all' | 'triage' | 'progress' | 'parts' | 'resolved'>('all');
  const [reassignTicketId, setReassignTicketId] = useState<string | null>(null);
  const [noteTicket, setNoteTicket] = useState<{ id: string; title: string } | null>(null);
  const [noteText, setNoteText] = useState('');

  // KPI calculations
  const totalCount = tickets.length;
  const criticalCount = tickets.filter(t => t.priority === 'Urgent' || t.priority === 'High').length;
  const pendingTriageCount = tickets.filter(t => t.status === 'Pending').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const partsCount = tickets.filter(t => t.status === 'Waiting on Parts').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.building.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase()) ||
        (t.technician && t.technician.toLowerCase().includes(search.toLowerCase()));

      const matchCategory =
        categoryFilter === 'all' || t.category.toLowerCase().includes(categoryFilter.toLowerCase());

      const matchSector =
        sectorFilter === 'all' || (t.sector && t.sector.toLowerCase().includes(sectorFilter.toLowerCase()));

      const matchPriority =
        priorityFilter === 'all' ||
        (priorityFilter === 'high' && (t.priority === 'Urgent' || t.priority === 'High')) ||
        (priorityFilter === 'medium' && t.priority === 'Medium') ||
        (priorityFilter === 'low' && t.priority === 'Low');

      let matchStatus = true;
      if (statusTab === 'triage') matchStatus = t.status === 'Pending';
      else if (statusTab === 'progress') matchStatus = t.status === 'In Progress';
      else if (statusTab === 'parts') matchStatus = t.status === 'Waiting on Parts';
      else if (statusTab === 'resolved') matchStatus = t.status === 'Resolved';

      return matchSearch && matchCategory && matchSector && matchPriority && matchStatus;
    });
  }, [tickets, search, categoryFilter, sectorFilter, priorityFilter, statusTab]);

  const resetFilters = () => {
    setSearch('');
    setCategoryFilter('all');
    setSectorFilter('all');
    setPriorityFilter('all');
    setStatusTab('all');
  };

  const exportCSV = () => {
    const headers = ['Ticket ID', 'Title', 'Category', 'Building', 'Location', 'Priority', 'Status', 'Technician', 'Created At'];
    const rows = tickets.map(t => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.category,
      `"${t.building}"`,
      `"${t.location}"`,
      t.priority,
      t.status,
      t.technician || 'Unassigned',
      t.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `campusfix_dispatch_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTicket || !noteText.trim()) return;

    addActivityLog(noteTicket.id, {
      title: 'Operations Center Note',
      note: noteText.trim(),
      author: 'Operations Dispatcher',
      type: 'comment'
    });

    setNoteText('');
    setNoteTicket(null);
  };

  const getCategoryDetails = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'plumbing':
        return { icon: 'plumbing', short: 'Plumb', bg: 'bg-error-container text-on-error-container' };
      case 'electrical':
        return { icon: 'electric_bolt', short: 'Power', bg: 'bg-error text-on-error animate-pulse' };
      case 'hvac':
        return { icon: 'ac_unit', short: 'HVAC', bg: 'bg-primary-fixed text-primary' };
      case 'structural':
      case 'furniture':
        return { icon: 'elevator', short: 'Elev', bg: 'bg-secondary-container text-on-secondary-fixed-variant' };
      default:
        return { icon: 'lightbulb', short: 'Util', bg: 'bg-surface-container text-on-surface' };
    }
  };

  return (
    <div className="w-full px-4 sm:px-space-lg py-space-lg min-h-screen">
      <div className="w-full max-w-7xl mx-auto space-y-space-md pb-16">
        {/* Operational Top Command Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
                Facilities Operations & Dispatch Center
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed-dim opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-on-tertiary-container"></span>
                </span>
                <span>Shift Active • {technicians.length} Technicians on Duty</span>
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Real-time facility ticket routing, technician assignment matrix, and SLA enforcement console.
            </p>
          </div>

          {/* Quick Operations Action Bar */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md shadow-sm transition-all border border-surface-container"
            >
              <Icon name="file_download" size={18} className="text-secondary" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md shadow-sm transition-all border border-surface-container"
            >
              <Icon name="print" size={18} className="text-secondary" />
              <span>Print Run Sheet</span>
            </button>
            <button
              onClick={() => setIsDispatchModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-error text-on-error hover:bg-error-container hover:text-on-error-container font-label-md text-label-md font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Icon name="emergency_home" size={18} />
              <span>Dispatch Urgent Crew</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics Grid (Bento Grid Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-lg">
          {/* Card 1: Active Work Orders */}
          <div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow border border-surface-container-low">
            <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full bg-primary/5 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                Total Active Work Orders
              </span>
              <span className="p-2 rounded-lg bg-primary-fixed text-on-primary-fixed">
                <Icon name="assignment_turned_in" size={20} />
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
                {totalCount}
              </span>
              <span className="font-label-sm text-label-sm text-error font-semibold flex items-center gap-0.5">
                <Icon name="warning" size={14} />
                <span>{criticalCount} Critical / High</span>
              </span>
            </div>
            <div className="w-full bg-surface-container-low rounded-full h-1.5 mt-2">
              <div className="bg-primary-container h-1.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <span className="font-body-sm text-[12px] text-outline block mt-1.5">
              Across all campus departments
            </span>
          </div>

          {/* Card 2: Unassigned / Triage */}
          <div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow border border-surface-container-low">
            <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full bg-error-container/20 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                Pending Triage
              </span>
              <span className="p-2 rounded-lg bg-error-container text-on-error-container">
                <Icon name="pending_actions" size={20} />
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-headline-xl text-headline-xl text-error font-bold">
                {pendingTriageCount}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Avg wait: 28 mins</span>
            </div>
            <div className="w-full bg-surface-container-low rounded-full h-1.5 mt-2">
              <div className="bg-error h-1.5 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <span className="font-body-sm text-[12px] text-error font-medium block mt-1.5">
              Action required: {pendingTriageCount} in triage queue
            </span>
          </div>

          {/* Card 3: In Progress */}
          <div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow border border-surface-container-low">
            <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full bg-secondary-fixed/30 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                Work In Progress
              </span>
              <span className="p-2 rounded-lg bg-secondary-container text-on-secondary-fixed-variant">
                <Icon name="engineering" size={20} />
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
                {inProgressCount}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                5 Campus Sectors
              </span>
            </div>
            <div className="w-full bg-surface-container-low rounded-full h-1.5 mt-2">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '52%' }}></div>
            </div>
            <span className="font-body-sm text-[12px] text-outline block mt-1.5">
              {technicians.filter(t => t.status === 'dispatched').length || 7} field engineers on site
            </span>
          </div>

          {/* Card 4: Resolved Today */}
          <div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow border border-surface-container-low">
            <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full bg-tertiary-fixed/20 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                Resolved Today
              </span>
              <span className="p-2 rounded-lg bg-tertiary-container text-on-tertiary-container">
                <Icon name="task_alt" size={20} />
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-headline-xl text-headline-xl text-tertiary font-bold">
                {resolvedCount}
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">98.4% SLA Pass</span>
            </div>
            <div className="w-full bg-surface-container-low rounded-full h-1.5 mt-2">
              <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '98.4%' }}></div>
            </div>
            <span className="font-body-sm text-[12px] text-outline block mt-1.5">
              +3 above daily operational quota
            </span>
          </div>
        </div>

        {/* Operational Filter & Control Bar */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg flex flex-col gap-space-md border border-surface-container-low">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                <Icon name="search" size={20} />
              </span>
              <input
                type="text"
                id="queueSearch"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search ticket #, technician, building, or description..."
                className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm"
              />
            </div>

            {/* Quick Selector Controls */}
            <div className="flex flex-wrap items-center gap-space-sm">
              {/* Category Filter */}
              <div className="relative">
                <select
                  id="categoryFilter"
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-surface hover:bg-surface-container text-on-surface font-label-md text-label-md py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none focus:bg-surface-container-lowest"
                >
                  <option value="all">All Categories</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC / Climate</option>
                  <option value="structural">Structural</option>
                  <option value="grounds">Grounds & Safety</option>
                </select>
                <Icon
                  name="expand_more"
                  size={18}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline"
                />
              </div>

              {/* Campus Sector Filter */}
              <div className="relative">
                <select
                  id="sectorFilter"
                  value={sectorFilter}
                  onChange={e => setSectorFilter(e.target.value)}
                  className="appearance-none bg-surface hover:bg-surface-container text-on-surface font-label-md text-label-md py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none focus:bg-surface-container-lowest"
                >
                  <option value="all">All Campus Sectors</option>
                  <option value="north">North Campus</option>
                  <option value="south">South Quad</option>
                  <option value="science">Central Science</option>
                  <option value="housing">Student Housing</option>
                </select>
                <Icon
                  name="expand_more"
                  size={18}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline"
                />
              </div>

              {/* Priority Filter Segment */}
              <div className="relative">
                <select
                  id="priorityFilter"
                  value={priorityFilter}
                  onChange={e => setPriorityFilter(e.target.value)}
                  className="appearance-none bg-surface hover:bg-surface-container text-on-surface font-label-md text-label-md py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none focus:bg-surface-container-lowest"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">Urgent / High</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low / Routine</option>
                </select>
                <Icon
                  name="expand_more"
                  size={18}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline"
                />
              </div>

              <button
                onClick={resetFilters}
                className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                title="Reset Filters"
              >
                <Icon name="filter_alt_off" size={20} />
              </button>
            </div>
          </div>

          {/* Status Tabs / Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 no-scrollbar">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-2 font-bold">
              Status:
            </span>
            <button
              onClick={() => setStatusTab('all')}
              className={`status-tab px-3 py-1.5 rounded-lg font-label-md text-label-md font-medium transition-all shadow-sm ${
                statusTab === 'all'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              All Tickets ({totalCount})
            </button>
            <button
              onClick={() => setStatusTab('triage')}
              className={`status-tab px-3 py-1.5 rounded-lg font-label-md text-label-md font-medium transition-all flex items-center gap-1.5 ${
                statusTab === 'triage'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span>Pending Triage ({pendingTriageCount})</span>
            </button>
            <button
              onClick={() => setStatusTab('progress')}
              className={`status-tab px-3 py-1.5 rounded-lg font-label-md text-label-md font-medium transition-all flex items-center gap-1.5 ${
                statusTab === 'progress'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span>In Progress ({inProgressCount})</span>
            </button>
            <button
              onClick={() => setStatusTab('parts')}
              className={`status-tab px-3 py-1.5 rounded-lg font-label-md text-label-md font-medium transition-all flex items-center gap-1.5 ${
                statusTab === 'parts'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Waiting on Parts ({partsCount})</span>
            </button>
            <button
              onClick={() => setStatusTab('resolved')}
              className={`status-tab px-3 py-1.5 rounded-lg font-label-md text-label-md font-medium transition-all flex items-center gap-1.5 ${
                statusTab === 'resolved'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>Resolved ({resolvedCount})</span>
            </button>
          </div>
        </div>

        {/* Main Split Layout: Work Orders Queue (9 Cols) + Tech Dispatch Sidebar (3 Cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* Work Orders Queue (Left & Center: 9 Cols) */}
          <div className="xl:col-span-9 flex flex-col gap-space-md">
            {/* Active Queue Card Container */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-surface-container-low">
              {/* Queue Header Metadata */}
              <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="tune" size={20} className="text-primary" />
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Priority Maintenance Feed
                  </span>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
                    {filteredTickets.length} Listed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                    <Icon name="check_circle" size={16} className="text-tertiary" />
                    <span>Auto-sync 30s</span>
                  </span>
                  <button
                    onClick={() => {}}
                    className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <Icon name="refresh" size={18} />
                  </button>
                </div>
              </div>

              {/* Issues Queue Table List */}
              <div className="flex flex-col divide-y divide-surface-container-low" id="ticketList">
                {filteredTickets.map(ticket => {
                  const catDetails = getCategoryDetails(ticket.category);
                  const isHigh = ticket.priority === 'Urgent' || ticket.priority === 'High';
                  const isResolved = ticket.status === 'Resolved';
                  const stripeColor = isResolved
                    ? 'bg-tertiary'
                    : isHigh
                    ? 'bg-error'
                    : 'bg-outline-variant';

                  return (
                    <div
                      key={ticket.id}
                      className={`ticket-row relative p-space-md hover:bg-surface-container-low/70 transition-colors bg-surface-container-lowest ${
                        isResolved ? 'opacity-90' : ''
                      }`}
                    >
                      {/* Left Urgency Stripe */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${stripeColor}`}></div>

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pl-2">
                        {/* Left Ticket Summary */}
                        <div className="flex items-start gap-space-md min-w-0 flex-1">
                          <div
                            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl shrink-0 ${catDetails.bg}`}
                          >
                            <Icon name={catDetails.icon} size={24} />
                            <span className="font-label-sm text-[9px] uppercase tracking-wider font-bold">
                              {catDetails.short}
                            </span>
                          </div>

                          <div className="flex flex-col min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <Link
                                href={`/issues/${ticket.id}`}
                                className="font-label-md text-label-md font-bold text-on-surface hover:text-primary transition-colors"
                              >
                                #{ticket.id}
                              </Link>

                              <span
                                className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 ${
                                  ticket.priority === 'Urgent'
                                    ? 'bg-error text-on-error'
                                    : ticket.priority === 'High'
                                    ? 'bg-error-container text-on-error-container'
                                    : ticket.priority === 'Medium'
                                    ? 'bg-secondary-container text-on-secondary-fixed-variant'
                                    : 'bg-surface-container text-on-surface-variant'
                                }`}
                              >
                                {ticket.priority === 'Urgent' && (
                                  <Icon name="notification_important" size={13} />
                                )}
                                <span>{ticket.priority} Priority</span>
                              </span>

                              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant bg-surface px-2 py-0.5 rounded">
                                <Icon name="location_on" size={14} />
                                <span>
                                  {ticket.building} • {ticket.location}
                                </span>
                              </span>
                            </div>

                            <Link
                              href={`/issues/${ticket.id}`}
                              className={`font-headline-sm text-headline-sm text-on-surface font-semibold truncate mb-1 block hover:text-primary transition-colors ${
                                isResolved ? 'line-through opacity-75' : ''
                              }`}
                            >
                              {ticket.title}
                            </Link>
                            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                              {ticket.description}
                            </p>
                          </div>
                        </div>

                        {/* Center/Right Details & In-Row Status Pill Controller */}
                        <div className="flex flex-wrap lg:flex-nowrap items-center gap-space-md shrink-0">
                          {/* SLA Indicator */}
                          <div className="flex flex-col items-start lg:items-end min-w-[120px]">
                            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                              SLA Target
                            </span>
                            <span
                              className={`font-label-md text-label-md font-semibold flex items-center gap-1 ${
                                isHigh ? 'text-error' : 'text-on-surface'
                              }`}
                            >
                              <Icon name="schedule" size={16} />
                              <span>{ticket.eta || '3.5 hrs remaining'}</span>
                            </span>
                            <div className="w-24 bg-surface-container rounded-full h-1 mt-1">
                              <div
                                className={`h-1 rounded-full ${
                                  isResolved ? 'bg-tertiary' : isHigh ? 'bg-error' : 'bg-primary'
                                }`}
                                style={{
                                  width: isResolved ? '100%' : isHigh ? '85%' : '48%'
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Assigned Technician Tag */}
                          <div className="flex items-center gap-2 bg-surface px-2.5 py-1.5 rounded-lg border border-surface-container-low">
                            {ticket.technician ? (
                              <>
                                <img
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDccmWcKtE-xzYM7IfzP790ST-b0F1bGA3aKgcNauVe206fSLf7nedtIf_OgjpeQsWzxWVMzLizvruOFOgJ_stxcrPdykRBlNdcWAr59BRjqknAtGAZGXSBFySbgeov22r14GcjtcN81Rq9p18DMUNRE1mkgAJdJH48bvaUJD8zd1VbXwC7mh0ERkljVaX4ElL3CPBEPMlYiaLL74vGV8B3Yhr6e8siuHdracEaAErz"
                                  alt="Tech"
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="font-label-md text-label-md text-on-surface font-medium truncate max-w-[90px]">
                                  {ticket.technician}
                                </span>
                                <button
                                  onClick={() => setReassignTicketId(ticket.id)}
                                  className="text-primary hover:underline font-label-sm text-label-sm ml-1"
                                >
                                  Reassign
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="font-label-md text-label-md text-on-error-container font-semibold">
                                  Unassigned
                                </span>
                                <button
                                  onClick={() => setReassignTicketId(ticket.id)}
                                  className="px-2 py-0.5 bg-primary text-on-primary rounded font-label-sm text-label-sm font-semibold hover:bg-primary-container shadow-sm transition-colors"
                                >
                                  Assign
                                </button>
                              </>
                            )}
                          </div>

                          {/* Interactive In-Row Status Pill Control */}
                          <div className="flex items-center bg-surface-container p-1 rounded-lg gap-1">
                            <button
                              onClick={() => updateTicketStatus(ticket.id, 'Pending')}
                              className={`px-2 py-1 rounded font-label-sm text-label-sm transition-colors ${
                                ticket.status === 'Pending'
                                  ? 'bg-error text-on-error font-bold shadow-sm'
                                  : 'text-on-surface-variant hover:bg-surface-container-highest'
                              }`}
                            >
                              Triage
                            </button>
                            <button
                              onClick={() => updateTicketStatus(ticket.id, 'In Progress')}
                              className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors ${
                                ticket.status === 'In Progress'
                                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                                  : 'text-on-surface-variant hover:bg-surface-container-highest'
                              }`}
                            >
                              In Progress
                            </button>
                            <button
                              onClick={() => updateTicketStatus(ticket.id, 'Resolved')}
                              className={`px-2 py-1 rounded font-label-sm text-label-sm transition-colors ${
                                ticket.status === 'Resolved'
                                  ? 'bg-tertiary text-on-tertiary font-bold shadow-sm'
                                  : 'text-on-surface-variant hover:bg-surface-container-highest'
                              }`}
                            >
                              Resolved
                            </button>
                          </div>

                          {/* Quick Note Trigger Button */}
                          <button
                            onClick={() => setNoteTicket({ id: ticket.id, title: ticket.title })}
                            className="p-2 rounded-lg bg-surface text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
                            title="Add Operational Note"
                          >
                            <Icon name="chat_bubble_outline" size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredTickets.length === 0 && (
                <div className="p-12 text-center text-outline">
                  <Icon name="search" size={36} className="mx-auto mb-2 opacity-50" />
                  <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                    No tickets found matching the selected filters.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Duty Roster & Quick Dispatch Sidebar (3 Cols) */}
          <aside className="xl:col-span-3 space-y-space-md">
            {/* Active Technicians on Duty Roster Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-low space-y-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold">
                  Duty Roster ({technicians.length})
                </span>
                <span className="px-2 py-0.5 rounded-full bg-on-tertiary-container text-tertiary font-label-sm text-[11px] font-bold">
                  Live
                </span>
              </div>

              <div className="space-y-space-sm">
                {technicians.map(tech => (
                  <div
                    key={tech.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative">
                        <img
                          src={tech.avatar}
                          alt={tech.name}
                          className="w-8 h-8 rounded-full object-cover shadow-sm"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                            tech.status === 'dispatched'
                              ? 'bg-primary'
                              : tech.status === 'active'
                              ? 'bg-tertiary'
                              : 'bg-outline'
                          }`}
                        ></span>
                      </div>
                      <div className="min-w-0">
                        <span className="font-label-md text-label-md font-semibold text-on-surface block truncate">
                          {tech.name}
                        </span>
                        <span className="font-label-sm text-[11px] text-on-surface-variant block truncate">
                          {tech.role}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`tel:${tech.phone.replace(/\D/g, '')}`}
                      className="p-1.5 rounded-lg text-primary hover:bg-surface-container-lowest transition-colors"
                      title={`Call ${tech.name}`}
                    >
                      <Icon name="phone" size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Hotline / Protocols Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-low space-y-space-sm">
              <div className="flex items-center gap-2 text-error">
                <Icon name="warning" size={20} />
                <h4 className="font-label-md text-label-md font-bold text-on-surface">
                  Urgent Crew Dispatch Hotline
                </h4>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                For chemical spills, power outages, or structural risks requiring immediate Hazmat or safety mobilization:
              </p>
              <div className="flex items-center justify-between bg-error-container text-on-error-container p-2.5 rounded-lg font-label-md text-label-md">
                <span className="font-semibold">Security Command:</span>
                <a href="tel:5550199" className="font-bold underline">
                  (555) 0199
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Operational Note Modal */}
      {noteTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-md w-full shadow-2xl border border-surface-container space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <Icon name="edit_note" size={20} className="text-primary" />
                <span>Add Note • #{noteTicket.id}</span>
              </h3>
              <button
                onClick={() => setNoteTicket(null)}
                className="p-1 rounded-lg hover:bg-surface-container text-outline"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Operational updates are visible across both technician and resident timelines.
            </p>
            <form onSubmit={handleSaveNote} className="space-y-3">
              <textarea
                required
                rows={4}
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Enter field observation, parts requisition reference, or hazard clearance..."
                className="w-full p-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-surface-container focus:border-primary-container resize-none"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoteTicket(null)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reassign Tech Modal */}
      {reassignTicketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-surface-container space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Reassign Technician
              </h3>
              <button
                onClick={() => setReassignTicketId(null)}
                className="p-1 rounded-lg hover:bg-surface-container text-outline"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Select available technician for work order #{reassignTicketId}:
            </p>
            <div className="space-y-2">
              {technicians.map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    assignTechnician(reassignTicketId, t.name);
                    setReassignTicketId(null);
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-left transition-colors"
                >
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <span className="font-label-md text-label-md font-semibold text-on-surface block truncate">
                      {t.name}
                    </span>
                    <span className="font-label-sm text-[11px] text-outline block truncate">
                      {t.role} • {t.sector}
                    </span>
                  </div>
                  <Icon name="chevron_right" size={16} className="text-outline" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
