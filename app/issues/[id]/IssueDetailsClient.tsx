'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TicketStatus } from '@/lib/types';
import { Icon } from '@/components/Icon';

interface IssueDetailsClientProps {
  id: string;
}

export function IssueDetailsClient({ id }: IssueDetailsClientProps) {
  const ticketId = id || 'CF-2024-8841';
  const { getTicketById, upvoteTicket, addActivityLog, updateTicketStatus, assignTechnician, technicians } = useApp();

  const ticket = getTicketById(ticketId);

  const [newLogNote, setNewLogNote] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  if (!ticket) {
    return (
      <div className="w-full px-4 sm:px-space-lg py-20 text-center">
        <div className="max-w-md mx-auto bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container space-y-4">
          <Icon name="search" size={48} className="text-outline mx-auto" />
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Ticket Not Found</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We couldn&apos;t find ticket #{ticketId}. It may have been archived or deleted.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md"
          >
            <Icon name="arrow_back" size={16} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogNote.trim()) return;

    addActivityLog(ticket.id, {
      title: 'Technician / Resident Observation',
      note: newLogNote,
      author: 'Alex Rivera (Resident Lead)',
      type: 'comment'
    });

    setNewLogNote('');
    setShowLogForm(false);
  };

  const handleStatusChange = (status: TicketStatus) => {
    updateTicketStatus(ticket.id, status);
  };

  return (
    <div className="w-full px-4 sm:px-space-lg py-space-lg min-h-screen">
      <div className="w-full max-w-7xl mx-auto space-y-space-md pb-16">
        {/* Top Context Navigation & Header Banner */}
        <div className="flex flex-col gap-space-md mb-space-lg">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md hover:underline group"
            >
              <Icon
                name="arrow_back"
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-space-sm">
              <span className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant font-mono">
                Ticket #{ticket.id}
              </span>
              <span className="text-outline font-label-sm text-label-sm">•</span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">
                Created {ticket.createdAt}
              </span>
            </div>
          </div>

          {/* Title and Dynamic Status Pills Card */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-low">
            <div className="flex flex-col gap-space-xs">
              <div className="flex flex-wrap items-center gap-space-sm mb-1">
                {/* Status Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>{ticket.status}</span>
                </span>

                {/* Priority Badge */}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-semibold">
                  <Icon name="warning" size={15} />
                  <span>{ticket.priority} / High Priority</span>
                </span>

                <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-low text-secondary font-medium">
                  SLA: Level 1 Escalation
                </span>
              </div>

              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                {ticket.title}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Reported by {ticket.reportedBy} (Resident ID #4928) • Central Campus Infrastructure Division
              </p>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
              <button
                onClick={() => upvoteTicket(ticket.id)}
                className={`flex items-center gap-space-xs px-4 py-2 rounded-lg font-label-md text-label-md shadow-sm transition-all active:scale-95 ${
                  ticket.userUpvoted
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-low text-primary hover:bg-surface-container'
                }`}
                id="upvoteBtn"
              >
                <Icon name="thumb_up" size={18} />
                <span>Verified by</span>
                <span className="font-bold ml-0.5" id="upvoteCount">
                  {ticket.upvotes}
                </span>
              </button>

              <button
                onClick={() => setShowLogForm(!showLogForm)}
                className="flex items-center gap-space-xs px-4 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all font-label-md text-label-md shadow-sm"
              >
                <Icon name="edit_note" size={18} />
                <span>Add Work Log</span>
              </button>

              {/* Status Selector */}
              <select
                value={ticket.status}
                onChange={e => handleStatusChange(e.target.value as TicketStatus)}
                className="px-3 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold cursor-pointer outline-none shadow-sm border border-surface-container-high"
              >
                <option value="Pending">Status: Pending</option>
                <option value="In Progress">Status: In Progress</option>
                <option value="Waiting on Parts">Status: On Parts</option>
                <option value="Resolved">Status: Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stepper / Visual Progress Timeline */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm mb-space-lg border border-surface-container-low">
          <div className="flex items-center justify-between mb-space-md flex-wrap gap-2">
            <div className="flex items-center gap-space-xs">
              <Icon name="timeline" size={20} className="text-primary" />
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Ticket Resolution Pipeline
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
              <Icon name="schedule" size={16} />
              <span>Target ETA: Today, 2:00 PM</span>
            </span>
          </div>

          {/* Horizontal Stepper Component */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4">
            {ticket.pipeline.map(step => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div
                  key={step.step}
                  className={`relative flex flex-col gap-2 p-space-sm rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary/10 shadow-sm'
                      : isCompleted
                      ? 'bg-surface-container-low/70'
                      : 'bg-surface-container-low/40 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    {isActive ? (
                      <div className="relative flex items-center justify-center w-7 h-7">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                        <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-on-primary shrink-0 relative">
                          <Icon name="engineering" size={16} />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                          isCompleted
                            ? 'bg-tertiary text-on-tertiary'
                            : 'bg-surface-container-highest text-outline'
                        }`}
                      >
                        <Icon name={isCompleted ? 'check' : 'pending'} size={16} />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span
                        className={`font-label-sm text-label-sm font-bold uppercase tracking-wider ${
                          isActive
                            ? 'text-primary'
                            : isCompleted
                            ? 'text-tertiary'
                            : 'text-outline'
                        }`}
                      >
                        {isActive ? 'Active Stage' : `Step ${step.step}`}
                      </span>
                      <span
                        className={`font-headline-sm text-headline-sm ${
                          isActive
                            ? 'text-primary'
                            : isCompleted
                            ? 'text-on-surface'
                            : 'text-outline'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {step.time}
                  </p>
                  <span
                    className={`font-label-sm text-label-sm ${
                      isActive ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {step.actor}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-Column Primary Layout Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT COLUMN: Main Information (8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* Complete Issue Description Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <Icon name="assignment" size={20} className="text-primary" />
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Incident Overview & Impact Analysis
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container font-mono font-label-sm text-label-sm text-on-surface-variant">
                  CAT-PLUMB-441
                </span>
              </div>

              <div className="text-on-surface-variant font-body-md text-body-md space-y-3 leading-relaxed">
                <p>
                  Significant water pooling has manifested in the 2nd Floor hallway corridor of the Central Library, directly opposite the entrance to East Wing Study Room 210. The fountain fixture&apos;s secondary feedline ruptured under continuous water pressure, resulting in active seepage across the commercial linoleum flooring.
                </p>

                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1">
                    <Icon name="emergency_home" size={18} className="text-error" />
                    <span>Identified Safety Hazards</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1 font-body-sm text-body-sm text-on-surface-variant">
                    <li>High-risk slip hazard spanning approximately 18 feet along major egress path.</li>
                    <li>Water proximity to baseboard electrical power raceways near Study Cubicle 212.</li>
                    <li>Ceiling plaster soaking noted directly below on Floor 1 stacks (Section 14B).</li>
                  </ul>
                </div>
              </div>

              {/* Metric Indicators */}
              <div className="grid grid-cols-3 gap-space-sm pt-space-xs">
                <div className="p-space-sm rounded-lg bg-surface-container flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Initial Flow Rate
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    ~1.2 Gal / Min
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Affected Radius
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    220 Sq. Ft
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Sub-floor Moisture
                  </span>
                  <span className="font-headline-sm text-headline-sm text-error">
                    High (Level 4)
                  </span>
                </div>
              </div>
            </div>

            {/* Attached Photo Evidence Display Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <Icon name="photo_library" size={20} className="text-primary" />
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Attached Visual Evidence
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  1 File Attached (JPG)
                </span>
              </div>

              {/* Evidence Showcase Module */}
              <div className="relative group rounded-xl overflow-hidden shadow-sm bg-surface-container-high aspect-[16/9] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  alt="Documentation photo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYp2azrLxP7wNG1sFDK514PyAzouyYxDMey8P6ArnzcyUw_jNptlbEZjDGEa2_yofJWEDRJ4QFxI3v3Qexq4dp2NmIapw-76mO6NMvAT0_GoVdVvqrgoDl2sj2u4pscHXGwnmodzPFhRYWZu0U8i-TATU3VTxMPaslTleEmdGv7-TwbfKThocEoCIGon5hrFqkcgyx6IBPCnA5TIEvqzIeT52o_wfhgDYtQ2SjgVRo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-space-md justify-between">
                  <div className="flex flex-col text-on-primary">
                    <span className="font-headline-sm text-headline-sm leading-tight text-white">
                      IMG_20241023_0918_RestroomHallway.jpg
                    </span>
                    <span className="font-label-sm text-label-sm opacity-80 text-white/80">
                      Uploaded: Oct 23, 09:18 AM • File size: 1.8 MB • Canon EOS Capture
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <button
                      onClick={() =>
                        setActivePhotoModal(
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYp2azrLxP7wNG1sFDK514PyAzouyYxDMey8P6ArnzcyUw_jNptlbEZjDGEa2_yofJWEDRJ4QFxI3v3Qexq4dp2NmIapw-76mO6NMvAT0_GoVdVvqrgoDl2sj2u4pscHXGwnmodzPFhRYWZu0U8i-TATU3VTxMPaslTleEmdGv7-TwbfKThocEoCIGon5hrFqkcgyx6IBPCnA5TIEvqzIeT52o_wfhgDYtQ2SjgVRo'
                        )
                      }
                      className="p-2 rounded-lg bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container-lowest backdrop-blur-md transition-colors shadow"
                      title="Zoom in"
                    >
                      <Icon name="zoom_in" size={18} />
                    </button>
                    <a
                      href="https://lh3.googleusercontent.com/aida-public/AB6AXuDYp2azrLxP7wNG1sFDK514PyAzouyYxDMey8P6ArnzcyUw_jNptlbEZjDGEa2_yofJWEDRJ4QFxI3v3Qexq4dp2NmIapw-76mO6NMvAT0_GoVdVvqrgoDl2sj2u4pscHXGwnmodzPFhRYWZu0U8i-TATU3VTxMPaslTleEmdGv7-TwbfKThocEoCIGon5hrFqkcgyx6IBPCnA5TIEvqzIeT52o_wfhgDYtQ2SjgVRo"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container-lowest backdrop-blur-md transition-colors shadow"
                      title="Download High-Res"
                    >
                      <Icon name="download" size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-space-xs">
                  <Icon name="verified" size={16} className="text-tertiary" />
                  <span>Metadata verified: Geolocation matched with Central Library East Wing Wi-Fi node #E2-9</span>
                </div>
                <span className="text-primary font-label-sm text-label-sm font-semibold">
                  EXIF Validated
                </span>
              </div>
            </div>

            {/* Activity & Updates Timeline Log */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <Icon name="history_toggle_off" size={20} className="text-primary" />
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Field Operations Activity Log
                  </h2>
                </div>
                <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                  Real-time Feed
                </span>
              </div>

              {/* Log items */}
              <div className="flex flex-col gap-space-md pl-2 relative">
                <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-surface-container-high"></div>

                {/* Log item 2: Parts Requested */}
                <div className="relative flex items-start gap-space-md group">
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 z-10 shadow-sm">
                    <Icon name="inventory_2" size={16} />
                  </div>
                  <div className="flex-1 bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1 transition-all group-hover:bg-surface-container">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Parts Requested from Central Warehouse
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                        Today • 10:15 AM
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      1-inch brass ball valve (Item SKU #VALV-092-B) and high-density industrial seal tape dispatched via facility runner. Expected arrival on site within 20 minutes.
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm">
                        Dave Miller (Tech Lead)
                      </span>
                      <span className="text-outline text-label-sm font-label-sm">•</span>
                      <span className="font-label-sm text-label-sm text-primary font-semibold">
                        Requisition #99403
                      </span>
                    </div>
                  </div>
                </div>

                {/* Log item 1: Valve Shut Off */}
                <div className="relative flex items-start gap-space-md group">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 z-10 shadow-sm">
                    <Icon name="plumbing" size={16} />
                  </div>
                  <div className="flex-1 bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1 transition-all group-hover:bg-surface-container">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Primary Isolation Valve Shut Off
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                        Today • 09:00 AM
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Maintenance crew arrived on site; shut off primary line valve located in utility riser closet #204. Active water emission halted. Industrial wet vacuums deployed to eliminate standing water.
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm">
                        Emergency Response Unit B
                      </span>
                      <span className="text-outline text-label-sm font-label-sm">•</span>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                        Water Containment Complete
                      </span>
                    </div>
                  </div>
                </div>

                {/* Initial Ticket Log */}
                <div className="relative flex items-start gap-space-md group">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center shrink-0 z-10 shadow-sm">
                    <Icon name="flag" size={16} />
                  </div>
                  <div className="flex-1 bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1 transition-all group-hover:bg-surface-container">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Ticket Logged & Automated Route Assigned
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                        Oct 23 • 09:15 AM
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Initial ticket submitted with 1 high-resolution photo evidence. Alert automatically routed to Facilities Zone 2 supervisor for rapid assessment.
                    </p>
                    <span className="px-2 py-0.5 w-max rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm mt-1">
                      System Bot (Dispatcher AI)
                    </span>
                  </div>
                </div>

                {/* Dynamic user logs */}
                {ticket.activityLogs
                  .filter(l => l.id !== 'log-1' && l.id !== 'log-2' && l.id !== 'log-3')
                  .map(log => (
                    <div key={log.id} className="relative flex items-start gap-space-md group">
                      <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 z-10 shadow-sm">
                        <Icon name="chat" size={16} />
                      </div>
                      <div className="flex-1 bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1 transition-all group-hover:bg-surface-container">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="font-headline-sm text-headline-sm text-on-surface">
                            {log.title}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                            {log.time}
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant">{log.note}</p>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          By {log.author}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Add Comment Form */}
              <form
                onSubmit={handleAddLog}
                className="pt-space-md bg-surface-container-low/60 p-space-md rounded-xl flex flex-col gap-space-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    Post Note or Status Invalidation
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">
                    Visible to Operations Staff & Students
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    rows={3}
                    required
                    value={newLogNote}
                    onChange={e => setNewLogNote(e.target.value)}
                    placeholder="Provide additional on-ground observations, note hazardous changes, or upload additional verification..."
                    className="w-full p-3 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm outline-none shadow-sm focus:ring-2 focus:ring-primary-container resize-none"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-space-xs text-on-surface-variant">
                    <button
                      type="button"
                      className="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
                      title="Attach file"
                    >
                      <Icon name="attach_file" size={20} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
                      title="Add location snapshot"
                    >
                      <Icon name="pin_drop" size={20} />
                    </button>
                    <span className="font-label-sm text-label-sm text-outline ml-2">
                      Supports PNG, JPG, PDF (max 10MB)
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Icon name="send" size={16} />
                    <span>Submit Entry</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Metadata Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            {/* Location Details Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <Icon name="location_on" size={20} className="text-primary" />
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Location Specifics
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded font-label-sm text-label-sm bg-surface-container text-primary font-semibold">
                  Zone 2
                </span>
              </div>

              {/* Mini Map Graphic */}
              <div className="w-full h-36 bg-surface-container-high rounded-lg shadow-sm relative overflow-hidden flex items-end p-space-sm border border-surface-container">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface-container to-surface-container-highest"></div>
                <div className="relative bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded shadow flex items-center gap-1.5">
                  <Icon name="location_on" size={18} className="text-error" />
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                    East Wing, 2nd Fl
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1 font-body-sm text-body-sm">
                <div className="flex justify-between items-center py-1 border-b border-surface-container-low">
                  <span className="text-on-surface-variant">Facility</span>
                  <span className="font-semibold text-on-surface">Central Library Building</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-surface-container-low">
                  <span className="text-on-surface-variant">Floor / Wing</span>
                  <span className="font-semibold text-on-surface">Level 2 • East Wing</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-surface-container-low">
                  <span className="text-on-surface-variant">Immediate Proximity</span>
                  <span className="font-semibold text-on-surface text-right">
                    Adjacent to Study Room 210
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-on-surface-variant">Access Constraints</span>
                  <span className="font-semibold text-error">Waterproof boots required</span>
                </div>
              </div>
            </div>

            {/* Assigned Technician Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <Icon name="badge" size={20} className="text-primary" />
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Assigned Technician
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                  On Site
                </span>
              </div>

              <div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-lg">
                <img
                  className="w-12 h-12 rounded-full object-cover shrink-0 shadow-sm"
                  alt="Dave Miller"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfd7auMs3zVUtA1JwlJ2O-Wik2m9e2cifz4yaz1KSkJaB4BN7EliO1B_wFaiezEnnUt-xuG9EGQppkf1UKAbuZHy1YYTrBfvfZdgL0HMvAiWoRqVR4p9i2aE8Qw6g0zsen7aP0Gy9BimqGQM3lxn4re9Bxp_vkYQauvaSR9woxBzBwnBjXALQoNkW907KrD-R7hnBMGSJ4iWqnFXYAtjmFvrTvC0s4XKrQxmxHzJOy"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                    Dave Miller
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Lead Hydraulics & Pipe Specialist
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">
                    Crew #4 (Plumbing Emergency)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-xs pt-1">
                <a
                  href="tel:5550199"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
                >
                  <Icon name="call" size={16} />
                  <span>Direct Call</span>
                </a>
                <button
                  onClick={() => alert('Radio dispatch ping sent to Dave Miller.')}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
                >
                  <Icon name="chat" size={16} />
                  <span>Radio Dispatch</span>
                </button>
              </div>
            </div>

            {/* Campus Service Impact & Notice */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-low">
              <div className="flex items-center gap-space-xs">
                <Icon name="notification_important" size={20} className="text-error" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Campus Service Impact
                </h3>
              </div>

              <div className="p-space-md rounded-lg bg-secondary-fixed/50 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-on-secondary-fixed">
                    Status Notice
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    Moderate Interruption
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-secondary-fixed leading-relaxed">
                  2nd Floor East Wing Restroom is temporarily closed. Alternative functional facilities are open on the 1st Floor Lobby and 3rd Floor Quiet Study wing.
                </p>
              </div>

              <div className="flex flex-col gap-2 font-body-sm text-body-sm pt-1">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Water Utility Main</span>
                  <span className="font-semibold text-error">Isolated to Wing 2E</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Library Public Hours</span>
                  <span className="font-semibold text-tertiary">Normal Schedule</span>
                </div>
              </div>
            </div>

            {/* Action Bar & Export Controls */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm border border-surface-container-low">
              <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                Record Management
              </h3>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Ticket link copied to clipboard!');
                }}
                className="w-full flex items-center justify-between px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
              >
                <div className="flex items-center gap-space-sm">
                  <Icon name="share" size={18} className="text-primary" />
                  <span>Share Ticket Report</span>
                </div>
                <Icon name="chevron_right" size={16} className="text-outline" />
              </button>

              <button
                onClick={() => alert('Subscribed to SMS updates for Ticket #' + ticket.id)}
                className="w-full flex items-center justify-between px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
              >
                <div className="flex items-center gap-space-sm">
                  <Icon name="notifications_active" size={18} className="text-primary" />
                  <span>Subscribe to SMS Updates</span>
                </div>
                <Icon name="chevron_right" size={16} className="text-outline" />
              </button>

              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-between px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
              >
                <div className="flex items-center gap-space-sm">
                  <Icon name="print" size={18} className="text-primary" />
                  <span>Print Work Order Slip</span>
                </div>
                <Icon name="chevron_right" size={16} className="text-outline" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Res Photo Lightbox Modal */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setActivePhotoModal(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <Icon name="close" size={20} />
            </button>
            <img
              src={activePhotoModal}
              alt="High-Res Evidence"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
