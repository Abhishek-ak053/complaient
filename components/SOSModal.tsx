'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Icon } from './Icon';

export function SOSModal() {
  const { isSOSOpen, setIsSOSOpen } = useApp();

  if (!isSOSOpen) return null;

  const hotlines = [
    {
      title: 'Campus Emergency Dispatch (24/7)',
      number: '(555) 0199',
      desc: 'Immediate life safety, active flooding, power lines down, structural compromise',
      primary: true
    },
    {
      title: 'Facilities Command HQ',
      number: '(555) 0122',
      desc: 'Water main shutoff, steam line rupture, elevator entrapment',
      primary: false
    },
    {
      title: 'Egress & Hazardous Materials Unit',
      number: '(555) 0144',
      desc: 'Chemical spills, gas odor detection, hazardous ventilation',
      primary: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0 -z-10" onClick={() => setIsSOSOpen(false)} />
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-error/30 overflow-hidden">
        {/* Urgent Header */}
        <div className="bg-error text-on-error p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icon name="phone_in_talk" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold leading-tight">
                Emergency Facilities Hotline
              </h3>
              <p className="font-body-sm text-body-sm text-white/90">
                Direct lines to university emergency dispatch & maintenance
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSOSOpen(false)}
            className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-error-container text-on-error-container rounded-xl flex items-start gap-2.5 font-body-sm text-body-sm">
            <Icon name="warning" size={20} className="text-error shrink-0 mt-0.5" />
            <span>
              If you smell natural gas, see exposed sparking wires, or notice uncontained structural
              flooding, evacuate immediately and call dispatch from a safe distance.
            </span>
          </div>

          <div className="space-y-2.5">
            {hotlines.map((h, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                  h.primary
                    ? 'border-error/40 bg-error/5 shadow-sm'
                    : 'border-surface-container bg-surface-container-low'
                }`}
              >
                <div className="min-w-0">
                  <span className="font-label-md text-label-md font-bold text-on-surface block">
                    {h.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                    {h.desc}
                  </span>
                </div>
                <a
                  href={`tel:${h.number.replace(/\D/g, '')}`}
                  className={`px-3.5 py-2 rounded-lg font-label-md text-label-md font-bold whitespace-nowrap flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 ${
                    h.primary
                      ? 'bg-error text-on-error hover:bg-error/90'
                      : 'bg-primary-container text-on-primary hover:bg-primary'
                  }`}
                >
                  <Icon name="call" size={16} />
                  <span>{h.number}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setIsSOSOpen(false)}
              className="px-5 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
