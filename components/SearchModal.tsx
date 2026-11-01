'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Icon } from './Icon';

export function SearchModal() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen, tickets, buildings, technicians } = useApp();
  const [query, setQuery] = useState('');

  // Handle keyboard shortcut ⌘K or Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredTickets = tickets.filter(
    t =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.id.toLowerCase().includes(query.toLowerCase()) ||
      t.building.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBuildings = buildings.filter(
    b =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.code.toLowerCase().includes(query.toLowerCase()) ||
      b.sector.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTechnicians = technicians.filter(
    tech =>
      tech.name.toLowerCase().includes(query.toLowerCase()) ||
      tech.role.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectTicket = (id: string) => {
    setIsSearchOpen(false);
    router.push(`/issues/${id}`);
  };

  const handleSelectBuilding = () => {
    setIsSearchOpen(false);
    router.push('/buildings');
  };

  const handleSelectStaff = () => {
    setIsSearchOpen(false);
    router.push('/staff');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-inverse-surface/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setIsSearchOpen(false)}
      />
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-surface-container bg-surface-container-low">
          <Icon name="search" size={24} className="text-outline mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tickets, rooms, buildings, or technicians..."
            className="w-full bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-outline"
          />
          <kbd
            onClick={() => setIsSearchOpen(false)}
            className="cursor-pointer font-label-sm text-[11px] bg-surface-container text-on-surface-variant px-2 py-0.5 rounded shadow-sm hover:bg-surface-container-high transition-colors"
          >
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
          {/* Tickets Section */}
          {filteredTickets.length > 0 && (
            <div>
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline px-2 block mb-2 font-bold">
                Tickets ({filteredTickets.length})
              </span>
              <div className="space-y-1">
                {filteredTickets.slice(0, 5).map(ticket => (
                  <div
                    key={ticket.id}
                    onClick={() => handleSelectTicket(ticket.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon
                          name={
                            ticket.category === 'Plumbing'
                              ? 'water_drop'
                              : ticket.category === 'Electrical'
                              ? 'electric_bolt'
                              : ticket.category === 'HVAC'
                              ? 'ac_unit'
                              : ticket.category === 'Wi-Fi / Tech'
                              ? 'wifi'
                              : 'assignment'
                          }
                          size={18}
                        />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-[11px] font-mono text-outline">
                            #{ticket.id}
                          </span>
                          <span className="font-label-md text-label-md font-semibold text-on-surface truncate group-hover:text-primary">
                            {ticket.title}
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate block">
                          {ticket.location}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] shrink-0 font-medium ${
                        ticket.status === 'Resolved'
                          ? 'bg-on-tertiary-container text-tertiary'
                          : ticket.status === 'In Progress'
                          ? 'bg-primary-fixed text-on-primary-fixed-variant'
                          : 'bg-secondary-container text-on-secondary-fixed-variant'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buildings Section */}
          {filteredBuildings.length > 0 && (
            <div>
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline px-2 block mb-2 font-bold">
                Buildings ({filteredBuildings.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredBuildings.map(b => (
                  <div
                    key={b.id}
                    onClick={handleSelectBuilding}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors border border-surface-container-low"
                  >
                    <Icon name="apartment" size={20} className="text-secondary" />
                    <div className="min-w-0 flex-1">
                      <span className="font-label-md text-label-md font-semibold text-on-surface block truncate">
                        {b.name}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        {b.code} • {b.activeTickets} active tickets
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technicians Section */}
          {filteredTechnicians.length > 0 && (
            <div>
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline px-2 block mb-2 font-bold">
                Field Technicians ({filteredTechnicians.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredTechnicians.map(t => (
                  <div
                    key={t.id}
                    onClick={handleSelectStaff}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-7 h-7 rounded-full object-cover shadow-sm"
                    />
                    <div className="min-w-0">
                      <span className="font-label-md text-label-md font-semibold text-on-surface block truncate">
                        {t.name}
                      </span>
                      <span className="font-body-sm text-[11px] text-outline block truncate">
                        {t.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredTickets.length === 0 &&
            filteredBuildings.length === 0 &&
            filteredTechnicians.length === 0 && (
              <div className="py-12 text-center text-outline">
                <Icon name="search_off" size={40} className="mb-2 opacity-50 mx-auto" />
                <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                  No matching tickets or records found
                </p>
                <p className="font-body-sm text-body-sm text-outline mt-1">
                  Try searching for keywords like &quot;leak&quot;, &quot;AC&quot;, &quot;Warren&quot;, or &quot;Dave&quot;.
                </p>
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-surface-container-low border-t border-surface-container flex items-center justify-between text-outline font-label-sm text-[11px]">
          <span>Tip: Jump directly to any ticket by entering its CF number</span>
          <div className="flex items-center gap-3">
            <span>Navigation: Click or Enter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
