'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Icon } from '@/components/Icon';

export default function BuildingsPage() {
  const { buildings, tickets } = useApp();
  const [selectedSector, setSelectedSector] = useState('all');

  const sectors = ['all', 'North Campus', 'Central Science', 'South Quad', 'Student Housing'];

  const filteredBuildings = buildings.filter(b => {
    if (selectedSector === 'all') return true;
    return b.sector === selectedSector;
  });

  return (
    <div className="w-full px-4 sm:px-space-lg py-space-lg min-h-screen">
      <div className="w-full max-w-7xl mx-auto space-y-space-lg pb-16">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/" className="font-label-md text-label-md text-outline hover:text-on-surface">
                Dashboard
              </Link>
              <Icon name="chevron_right" size={14} className="text-outline" />
              <span className="font-label-md text-label-md text-primary font-medium">Buildings & Assets</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
              Campus Facilities & Infrastructure Assets
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
              Live building operational health indexes, active maintenance workloads, and critical infrastructure telemetry.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <Link
              href="/report"
              className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all shadow-sm flex items-center gap-1.5"
            >
              <Icon name="add_circle" size={18} />
              <span>Report Building Issue</span>
            </Link>
          </div>
        </div>

        {/* Campus Map Schematic Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-surface-container-lowest p-6 border border-surface-container-low shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-lg">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
                <Icon name="map" size={16} />
                <span>Interactive Campus Grid</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                5 Primary Sectors Under Active Monitoring
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Facilities dispatch utilizes automated IoT pressure, water sensor, and HVAC flow telemetry
                linked directly to campus GIS building models.
              </p>
              <div className="flex items-center gap-4 text-label-sm font-label-sm pt-1">
                <span className="flex items-center gap-1.5 text-tertiary font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                  <span>Nominal (3 Buildings)</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Active Tickets (2 Buildings)</span>
                </span>
              </div>
            </div>

            {/* Map Visual Pins Grid */}
            <div className="w-full lg:w-96 p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold">
                Quick Sector Selector
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sectors.map(sec => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm capitalize transition-all ${
                      selectedSector === sec
                        ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                        : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Buildings Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredBuildings.map(building => {
            const buildingTickets = tickets.filter(t => t.building === building.name);
            const activeCount = buildingTickets.filter(t => t.status !== 'Resolved').length;

            return (
              <div
                key={building.id}
                className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-surface-container-low flex flex-col justify-between"
              >
                <div>
                  {/* Photo header */}
                  <div className="relative h-44 w-full overflow-hidden bg-surface-container-high">
                    <img
                      src={building.image}
                      alt={building.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-inverse-surface/80 text-inverse-on-surface font-mono font-label-sm text-xs backdrop-blur-md">
                        {building.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 text-on-surface font-label-sm text-[11px] font-semibold backdrop-blur-md">
                        {building.sector}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-1 rounded-full font-label-sm text-xs font-bold shadow-md ${
                          building.status === 'Nominal'
                            ? 'bg-tertiary-container text-on-tertiary-container'
                            : 'bg-error-container text-on-error-container'
                        }`}
                      >
                        {building.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                        {building.name}
                      </h3>
                      <span className="font-label-sm text-sm text-tertiary font-bold">
                        {building.healthScore}% Health
                      </span>
                    </div>

                    <div className="w-full bg-surface-container-low rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          building.healthScore > 85 ? 'bg-tertiary' : 'bg-primary-container'
                        }`}
                        style={{ width: `${building.healthScore}%` }}
                      ></div>
                    </div>

                    <div className="space-y-1.5 text-body-sm text-on-surface-variant pt-2 border-t border-surface-container-low">
                      <div className="flex items-center justify-between">
                        <span className="text-outline">Floors / Levels:</span>
                        <span className="font-medium text-on-surface">{building.floors} Floors</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-outline">Active Work Orders:</span>
                        <span className="font-bold text-primary">{activeCount} Pending/Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-outline">Emergency Coordinator:</span>
                        <span className="font-medium text-on-surface">{building.emergencyLead}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-between gap-2">
                  <Link
                    href={`/?building=${encodeURIComponent(building.name)}`}
                    className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View {activeCount} Tickets</span>
                    <Icon name="chevron_right" size={16} />
                  </Link>

                  <Link
                    href="/report"
                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm shadow-sm transition-colors"
                  >
                    Report Here
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
