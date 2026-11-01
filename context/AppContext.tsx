'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, Technician, Building, AppNotification, TicketStatus, ActivityLog } from '@/lib/types';
import { INITIAL_TICKETS, INITIAL_TECHNICIANS, INITIAL_BUILDINGS, INITIAL_NOTIFICATIONS } from '@/lib/data';

interface AppContextType {
  tickets: Ticket[];
  technicians: Technician[];
  buildings: Building[];
  notifications: AppNotification[];
  currentView: 'student' | 'staff';
  toggleView: () => void;
  setCurrentView: (view: 'student' | 'staff') => void;
  addTicket: (newTicket: {
    title: string;
    category: Ticket['category'];
    building: string;
    location: string;
    priority: Ticket['priority'];
    description: string;
    images?: string[];
  }) => Ticket;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  assignTechnician: (ticketId: string, technicianName: string) => void;
  upvoteTicket: (id: string) => void;
  addActivityLog: (ticketId: string, log: { title: string; author: string; note: string; type?: ActivityLog['type'] }) => void;
  markNotificationsRead: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSOSOpen: boolean;
  setIsSOSOpen: (open: boolean) => void;
  isDispatchModalOpen: boolean;
  setIsDispatchModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getTicketById: (id: string) => Ticket | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [buildings] = useState<Building[]>(INITIAL_BUILDINGS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [currentView, setCurrentView] = useState<'student' | 'staff'>('student');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate from localStorage if present
  useEffect(() => {
    try {
      const savedTickets = localStorage.getItem('campusfix_tickets');
      if (savedTickets) {
        setTickets(JSON.parse(savedTickets));
      }
      const savedView = localStorage.getItem('campusfix_view');
      if (savedView === 'staff' || savedView === 'student') {
        setCurrentView(savedView);
      }
    } catch {
      // Local storage unavailable or SSR fallback
    }
  }, []);

  const saveTickets = (updated: Ticket[]) => {
    setTickets(updated);
    try {
      localStorage.setItem('campusfix_tickets', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleView = () => {
    const nextView = currentView === 'student' ? 'staff' : 'student';
    setCurrentView(nextView);
    try {
      localStorage.setItem('campusfix_view', nextView);
    } catch {
      // ignore
    }
  };

  const addTicket = (data: {
    title: string;
    category: Ticket['category'];
    building: string;
    location: string;
    priority: Ticket['priority'];
    description: string;
    images?: string[];
  }): Ticket => {
    const generatedNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CF-2024-${generatedNum}`;
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const newTicket: Ticket = {
      id: newId,
      title: data.title,
      category: data.category,
      building: data.building,
      location: data.location,
      priority: data.priority,
      status: 'Pending',
      reportedBy: 'Alex Rivera (Resident ID #4928)',
      createdAt: `${dateStr}, ${timeStr}`,
      eta: data.priority === 'Urgent' ? 'Avg. ~18 mins' : 'Avg. ~24 hrs',
      upvotes: 1,
      userUpvoted: true,
      description: data.description,
      images: data.images && data.images.length > 0 ? data.images : [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDYp2azrLxP7wNG1sFDK514PyAzouyYxDMey8P6ArnzcyUw_jNptlbEZjDGEa2_yofJWEDRJ4QFxI3v3Qexq4dp2NmIapw-76mO6NMvAT0_GoVdVvqrgoDl2sj2u4pscHXGwnmodzPFhRYWZu0U8i-TATU3VTxMPaslTleEmdGv7-TwbfKThocEoCIGon5hrFqkcgyx6IBPCnA5TIEvqzIeT52o_wfhgDYtQ2SjgVRo'
      ],
      pipeline: [
        { step: 1, label: 'Reported', status: 'completed', time: `${dateStr} at ${timeStr}`, actor: 'Logged by Alex Rivera' },
        { step: 2, label: 'Acknowledged', status: 'active', time: 'In dispatch queue', actor: 'Awaiting triage' },
        { step: 3, label: 'In Progress', status: 'upcoming', time: 'Pending assignment', actor: 'Unassigned' },
        { step: 4, label: 'Resolved', status: 'upcoming', time: 'Pending completion', actor: 'Pending verification' }
      ],
      activityLogs: [
        {
          id: `log-${Date.now()}`,
          type: 'report',
          title: 'Ticket Created via Resident Portal',
          time: 'Just now',
          author: 'Alex Rivera',
          note: `Incident report generated under category: ${data.category}. SMS alerts enabled.`
        }
      ]
    };

    const updated = [newTicket, ...tickets];
    saveTickets(updated);

    // Also push a notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Ticket Submitted',
      description: `Report #${newId} logged for ${data.building}.`,
      time: 'Just now',
      read: false,
      ticketId: newId,
      type: 'alert'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newTicket;
  };

  const updateTicketStatus = (id: string, newStatus: TicketStatus) => {
    const updated = tickets.map(ticket => {
      if (ticket.id !== id) return ticket;

      const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const updatedPipeline = ticket.pipeline.map(step => {
        if (newStatus === 'Pending') {
          if (step.step === 1) return { ...step, status: 'completed' as const };
          if (step.step === 2) return { ...step, status: 'active' as const };
          return { ...step, status: 'upcoming' as const };
        } else if (newStatus === 'In Progress') {
          if (step.step <= 2) return { ...step, status: 'completed' as const };
          if (step.step === 3) return { ...step, status: 'active' as const, time: `Today at ${nowStr}` };
          return { ...step, status: 'upcoming' as const };
        } else if (newStatus === 'Resolved') {
          return { ...step, status: 'completed' as const, time: step.step === 4 ? `Completed at ${nowStr}` : step.time };
        }
        return step;
      });

      const newLog: ActivityLog = {
        id: `log-${Date.now()}`,
        type: newStatus === 'Resolved' ? 'resolved' : 'dispatch',
        title: `Status Changed to ${newStatus}`,
        time: 'Just now',
        author: 'Operations Staff Console',
        note: `Ticket lifecycle state moved to ${newStatus}. All subscribers notified.`
      };

      return {
        ...ticket,
        status: newStatus,
        pipeline: updatedPipeline,
        activityLogs: [newLog, ...ticket.activityLogs]
      };
    });

    saveTickets(updated);
  };

  const assignTechnician = (ticketId: string, technicianName: string) => {
    const updated = tickets.map(ticket => {
      if (ticket.id !== ticketId) return ticket;
      const newLog: ActivityLog = {
        id: `log-${Date.now()}`,
        type: 'dispatch',
        title: `Assigned to ${technicianName}`,
        time: 'Just now',
        author: 'Dispatch Center',
        note: `Lead field technician ${technicianName} assigned to work order.`
      };
      return {
        ...ticket,
        technician: technicianName,
        status: ticket.status === 'Pending' ? ('In Progress' as TicketStatus) : ticket.status,
        activityLogs: [newLog, ...ticket.activityLogs]
      };
    });
    saveTickets(updated);
  };

  const upvoteTicket = (id: string) => {
    const updated = tickets.map(ticket => {
      if (ticket.id !== id) return ticket;
      const hasUpvoted = ticket.userUpvoted;
      return {
        ...ticket,
        upvotes: hasUpvoted ? ticket.upvotes - 1 : ticket.upvotes + 1,
        userUpvoted: !hasUpvoted
      };
    });
    saveTickets(updated);
  };

  const addActivityLog = (
    ticketId: string,
    log: { title: string; author: string; note: string; type?: ActivityLog['type'] }
  ) => {
    const updated = tickets.map(ticket => {
      if (ticket.id !== ticketId) return ticket;
      const newLog: ActivityLog = {
        id: `log-${Date.now()}`,
        type: log.type || 'comment',
        title: log.title,
        time: 'Just now',
        author: log.author,
        note: log.note
      };
      return {
        ...ticket,
        activityLogs: [newLog, ...ticket.activityLogs]
      };
    });
    saveTickets(updated);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getTicketById = (id: string) => {
    return tickets.find(t => t.id.toLowerCase() === id.toLowerCase());
  };

  return (
    <AppContext.Provider
      value={{
        tickets,
        technicians,
        buildings,
        notifications,
        currentView,
        toggleView,
        setCurrentView,
        addTicket,
        updateTicketStatus,
        assignTechnician,
        upvoteTicket,
        addActivityLog,
        markNotificationsRead,
        isSearchOpen,
        setIsSearchOpen,
        isSOSOpen,
        setIsSOSOpen,
        isDispatchModalOpen,
        setIsDispatchModalOpen,
        searchQuery,
        setSearchQuery,
        getTicketById
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
