'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Icon } from './Icon';

export function DispatchModal() {
  const { isDispatchModalOpen, setIsDispatchModalOpen, addTicket, technicians, buildings } = useApp();

  const [building, setBuilding] = useState(buildings[0]?.name || 'Warren Tower');
  const [room, setRoom] = useState('');
  const [hazard, setHazard] = useState('Active Water Main Seepage');
  const [selectedTech, setSelectedTech] = useState(technicians[0]?.name || 'Dave M.');
  const [notes, setNotes] = useState('');
  const [dispatched, setDispatched] = useState(false);

  if (!isDispatchModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTicket({
      title: `[EMERGENCY DISPATCH] ${hazard} at ${building}`,
      category: 'Plumbing',
      building,
      location: `${building} • ${room || 'Immediate Ground Area'}`,
      priority: 'Urgent',
      description: `Rapid dispatch initiated from Facilities Command Center. Lead assigned: ${selectedTech}. Direct briefing: ${notes || 'Immediate containment protocol in effect.'}`
    });

    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
      setIsDispatchModalOpen(false);
      setRoom('');
      setNotes('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0 -z-10" onClick={() => setIsDispatchModalOpen(false)} />
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container overflow-hidden">
        {/* Header */}
        <div className="bg-error text-on-error p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Icon name="emergency_home" size={24} className="text-white" />
            <div>
              <h3 className="font-headline-md text-headline-md font-bold leading-tight">
                Emergency Crew Quick Dispatch
              </h3>
              <p className="font-body-sm text-[12px] text-white/90">
                Command center rapid work order issuance
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDispatchModalOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Form Body */}
        {dispatched ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center mx-auto">
              <Icon name="verified" size={32} />
            </div>
            <h4 className="font-headline-md text-headline-md font-bold text-on-surface">
              Crew Dispatched Successfully!
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Field technician <span className="font-bold text-on-surface">{selectedTech}</span> has been
              alerted via high-priority radio pager.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Target Campus Building
              </label>
              <select
                value={building}
                onChange={e => setBuilding(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                {buildings.map(b => (
                  <option key={b.id} value={b.name}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Specific Location / Room
              </label>
              <input
                type="text"
                required
                value={room}
                onChange={e => setRoom(e.target.value)}
                placeholder="e.g. 1st Floor East Mechanical Room or Stairwell B"
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div className="space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Hazard Classification
              </label>
              <select
                value={hazard}
                onChange={e => setHazard(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="Active Water Main Seepage">Active Water Main Seepage / Burst</option>
                <option value="Steam Valve Pressure Hazard">Steam Valve Pressure Hazard</option>
                <option value="HVAC Chiller Compressor Failure">HVAC Chiller Compressor Failure</option>
                <option value="Elevator Entrapment / Power Cut">Elevator Entrapment / Power Cut</option>
                <option value="Structural / Egress Obstruction">Structural / Egress Obstruction</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Lead Technician to Dispatch
              </label>
              <select
                value={selectedTech}
                onChange={e => setSelectedTech(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                {technicians.map(t => (
                  <option key={t.id} value={t.name}>
                    {t.name} — {t.role} ({t.status === 'dispatched' ? 'On Site' : 'Available'})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Urgent Field Instructions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Bring water extractor vacuum, lock out tag out kit..."
                className="w-full p-2.5 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDispatchModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-error text-on-error font-label-md text-label-md font-bold shadow-md hover:bg-error/90 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Icon name="bolt" size={18} />
                <span>Issue Dispatch Pager</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
