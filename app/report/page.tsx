'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useApp } from '@/context/AppContext';
import { TicketCategory, TicketPriority } from '@/lib/types';
import { Icon } from '@/components/Icon';

export default function ReportIssuePage() {
  const router = useRouter();
  const { addTicket, buildings } = useApp();

  const [title, setTitle] = useState('Leaking water pipe under sink in dorm 204');
  const [category, setCategory] = useState<TicketCategory>('Plumbing');
  const [building, setBuilding] = useState('Warren Tower');
  const [location, setLocation] = useState('2nd Floor, Room 204 (Suite B)');
  const [priority, setPriority] = useState<TicketPriority>('Urgent');
  const [description, setDescription] = useState(
    'Persistent stream leaking from junction joint under the cold tap shutoff valve. Water is pooling inside base cabinet.'
  );
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [directContact, setDirectContact] = useState(true);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<
    { name: string; size: string; url: string; verified: boolean }[]
  >([
    {
      name: 'pipe_leak_dorm204.jpg',
      size: '2.4 MB',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8mTz99_DdQEn7mn4bzpULC9eyc53bqwc_upz4S42xcuw4hKdBTdMKQU6CpvB8duT8qXt1_ZCosH9wVOc2iLXZRx_7F9sDQBYdWFd6oUwUsWdoLR52ldPUf2gveBEwLf65Q5NwcROzJpXYYL2k3hLo13c9PGhOOXONpWh6mPbOuvcJS7jesyJg6kVmaiaID-MvNOm8tlsdxNYqSjoTiPEEiXhstsj5T21KuVuijWnf',
      verified: true
    },
    {
      name: 'base_cabinet_water.jpg',
      size: '1.8 MB',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK2f7ywkaI18j-oSEgVI9dne_1fmfrXwjmrfi_doYuZsAa7Y_1BJuwTDZNs73DjAIjmlEol4_B1HAD_JN2lzk6-KzSHt2hwIKztFEafTIVen93_n5weAdr-ctBKtt5weZcYVyJmT_T_ZU34tG_Vv3erQCnNlkJliIPZIKHzl7384omHkjUcjLW6rsEWXqv44VArIGM20oGoM1tvua7X3ndbCQK6i74A5z1vesNZ8vP',
      verified: true
    }
  ]);

  const categories: { label: TicketCategory; icon: string }[] = [
    { label: 'Electrical', icon: 'electric_bolt' },
    { label: 'Plumbing', icon: 'water_drop' },
    { label: 'Furniture', icon: 'chair' },
    { label: 'Wi-Fi / Tech', icon: 'wifi' },
    { label: 'Sanitation', icon: 'cleaning_services' },
    { label: 'Exterior / Grounds', icon: 'more_horiz' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newTicket = addTicket({
      title: title || 'Campus Maintenance Incident',
      category,
      building: building || 'Warren Tower',
      location: location || 'Campus Main Grounds',
      priority,
      description,
      images: uploadedPhotos.map(p => p.url)
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setSubmittedTicketId(newTicket.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    if (confirm('Discard changes and reset this report form?')) {
      setTitle('');
      setLocation('');
      setDescription('');
      setCategory('Plumbing');
      setPriority('Low');
    }
  };

  const getSLAIndicator = () => {
    switch (priority) {
      case 'Urgent':
        return 'Dispatched in < 2 hrs';
      case 'High':
        return 'Dispatched in < 6 hrs';
      case 'Medium':
        return 'Dispatched in 24 hrs';
      default:
        return 'Standard queue (3-5 days)';
    }
  };

  const getCategoryIcon = (cat: TicketCategory) => {
    const found = categories.find(c => c.label === cat);
    return found ? found.icon : 'water_drop';
  };

  return (
    <div className="w-full px-4 sm:px-space-lg py-space-lg min-h-screen">
      <div className="w-full max-w-7xl mx-auto space-y-space-md pb-16">
        {/* Top Breadcrumb & Header Context */}
        <div className="flex flex-col gap-y-space-md mb-space-lg">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-label-md text-label-md text-outline hover:text-on-surface">
              Dashboard
            </Link>
            <Icon name="chevron_right" size={14} className="text-outline" />
            <span className="font-label-md text-label-md text-primary font-medium">Report New Issue</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm mb-2">
                <Icon name="flag" size={14} />
                <span>Facilities Dispatch Portal</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Submit a Campus Maintenance Report
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                Please provide detailed information so our facilities team can dispatch the right crew, safety clearance, and specialized tools swiftly.
              </p>
            </div>

            <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm border border-surface-container-low">
              <Icon name="bolt" size={20} className="text-primary" />
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Avg. Response Time</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  18 mins for high priority
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {submittedTicketId && (
          <div className="flex items-start justify-between bg-surface-container-lowest p-space-lg rounded-xl shadow-md border-2 border-tertiary-container mb-space-lg animate-in fade-in duration-300">
            <div className="flex gap-space-md items-start">
              <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
                <Icon name="verified" size={24} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Report Submitted Successfully!
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                    Ticket #{submittedTicketId}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Assigned to <span className="font-semibold text-on-surface">Facilities District 2</span> (Plumbing & Structural Crew). Push and SMS alerts have been activated.
                </p>
                <div className="flex items-center gap-space-md mt-space-sm">
                  <Link
                    href={`/issues/${submittedTicketId}`}
                    className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Track Live Dispatch</span>
                    <Icon name="arrow_forward" size={16} />
                  </Link>
                  <button
                    onClick={() => setSubmittedTicketId(null)}
                    className="font-label-md text-label-md text-outline hover:text-on-surface"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSubmittedTicketId(null)}
              className="p-1 rounded-lg hover:bg-surface-container text-outline"
            >
              <Icon name="close" size={20} />
            </button>
          </div>
        )}

        {/* Form and Preview Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest p-6 sm:p-space-xl rounded-xl shadow-sm border border-surface-container-low">
              <form className="flex flex-col gap-space-xl" onSubmit={handleSubmit}>
                {/* Issue Title */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex justify-between items-center">
                    <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1">
                      <span>Issue Title</span>
                      <span className="text-error font-bold">*</span>
                    </label>
                    <span className="font-label-sm text-label-sm text-outline">Specific & concise</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Leaking water pipe under sink in dorm 204"
                    className="w-full h-11 px-3.5 bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg outline-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-surface-container-low focus:border-primary-container focus:ring-2 focus:ring-primary-container"
                  />
                  <span className="font-body-sm text-body-sm text-outline">
                    Summarize the hazard or disruption in 10 words or fewer.
                  </span>
                </div>

                {/* Category Selection Grid */}
                <div className="flex flex-col gap-space-sm">
                  <div className="flex justify-between items-center">
                    <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1">
                      <span>Select Category</span>
                      <span className="text-error font-bold">*</span>
                    </label>
                    <span className="font-label-sm text-label-sm text-outline">
                      {category} selected
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm">
                    {categories.map(cat => {
                      const isSelected = category === cat.label;
                      return (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => setCategory(cat.label)}
                          className={`p-3.5 rounded-xl flex flex-col items-center justify-center gap-2 transition-all shadow-sm ${
                            isSelected
                              ? 'bg-primary-container text-on-primary ring-2 ring-primary-container'
                              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                          }`}
                        >
                          <Icon name={cat.icon} size={24} />
                          <span className="font-label-md text-label-md font-medium text-center">
                            {cat.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location Fields (Building & Specific Location) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-space-xs">
                    <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1">
                      <span>Campus Building</span>
                      <span className="text-error font-bold">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={building}
                        onChange={e => setBuilding(e.target.value)}
                        className="w-full h-11 px-3.5 appearance-none bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg outline-none shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-surface-container-low focus:border-primary-container focus:ring-2 focus:ring-primary-container cursor-pointer pr-10"
                      >
                        <option value="Warren Tower">Warren Tower</option>
                        <option value="Science Hall">Science Hall</option>
                        <option value="Student Union Center">Student Union Center</option>
                        <option value="Central Campus Library">Central Campus Library</option>
                        <option value="North Dormitory Complex">North Dormitory Complex</option>
                        <option value="Engineering Hall">Engineering Hall</option>
                      </select>
                      <Icon
                        name="expand_more"
                        size={20}
                        className="pointer-events-none absolute right-3 top-3 text-outline"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1">
                      <span>Specific Location / Room</span>
                      <span className="text-error font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. 3rd Floor, Room 314, North Wing Restroom"
                      className="w-full h-11 px-3.5 bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg outline-none shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-surface-container-low focus:border-primary-container focus:ring-2 focus:ring-primary-container transition-all"
                    />
                  </div>
                </div>

                {/* Priority Level Radio Cards */}
                <div className="flex flex-col gap-space-sm">
                  <div className="flex justify-between items-center">
                    <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1">
                      <span>Priority Level</span>
                      <span className="text-error font-bold">*</span>
                    </label>
                    <span
                      className={`font-label-sm text-label-sm font-medium ${
                        priority === 'Urgent'
                          ? 'text-error'
                          : priority === 'Medium'
                          ? 'text-on-surface-variant'
                          : 'text-outline'
                      }`}
                    >
                      {getSLAIndicator()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                    {/* Low */}
                    <button
                      type="button"
                      onClick={() => setPriority('Low')}
                      className={`p-3.5 rounded-lg flex flex-col gap-1 text-left transition-all border ${
                        priority === 'Low'
                          ? 'bg-surface-container shadow-sm border-secondary'
                          : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          Low Priority
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      </div>
                      <span className="font-body-sm text-body-sm text-outline">
                        Routine maintenance, aesthetic upkeep (3-5 days)
                      </span>
                    </button>

                    {/* Medium */}
                    <button
                      type="button"
                      onClick={() => setPriority('Medium')}
                      className={`p-3.5 rounded-lg flex flex-col gap-1 text-left transition-all border ${
                        priority === 'Medium'
                          ? 'bg-surface-container-high shadow-sm border-primary-container'
                          : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          Medium
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                      </div>
                      <span className="font-body-sm text-body-sm text-outline">
                        Standard repair, non-critical room disruption (24 hrs)
                      </span>
                    </button>

                    {/* Urgent / High */}
                    <button
                      type="button"
                      onClick={() => setPriority('Urgent')}
                      className={`p-3.5 rounded-lg flex flex-col gap-1 text-left transition-all shadow-sm border ${
                        priority === 'Urgent'
                          ? 'bg-error text-on-error border-error'
                          : 'bg-error-container text-on-error-container border-transparent hover:bg-error-container/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Icon name="warning" size={16} />
                          <span className="font-label-md text-label-md font-bold">High / Urgent</span>
                        </div>
                        <span className="w-2.5 h-2.5 rounded-full bg-on-error animate-pulse"></span>
                      </div>
                      <span
                        className={`font-body-sm text-body-sm ${
                          priority === 'Urgent' ? 'opacity-90' : 'text-on-error-container'
                        }`}
                      >
                        Safety hazard, active flood, electrical risk (&lt; 2 hrs)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex justify-between items-center">
                    <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-1">
                      <span>Detailed Description</span>
                      <span className="text-error font-bold">*</span>
                    </label>
                    <span className="font-label-sm text-label-sm text-outline">
                      {description.length} / 600
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={600}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe what happened, any visible damage, and how long it has been occurring..."
                    className="w-full p-3.5 bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg outline-none shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-surface-container-low focus:border-primary-container focus:ring-2 focus:ring-primary-container transition-all resize-none"
                  ></textarea>
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                    <Icon name="check_circle" size={16} className="text-tertiary" />
                    <span>Including access instructions or best time to enter helps crew expedite repairs.</span>
                  </div>
                </div>

                {/* Photo & Evidence Upload */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Photo & Evidence Upload
                  </label>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Attach real-time snapshots to assist technicians with required replacement parts.
                  </span>

                  {/* Dropzone */}
                  <div className="mt-1 flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors shadow-inner group border border-dashed border-outline-variant">
                    <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform shadow-sm mb-2">
                      <Icon name="cloud_upload" size={28} />
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      Drag and drop photos here, or browse files
                    </span>
                    <span className="font-body-sm text-body-sm text-outline mt-0.5">
                      PNG, JPG or WebP up to 10MB each
                    </span>
                  </div>

                  {/* Uploaded Previews */}
                  <div className="flex flex-wrap gap-space-sm mt-space-sm">
                    {uploadedPhotos.map((photo, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-space-sm bg-surface-container-lowest p-2 rounded-lg shadow-sm border border-surface-container-low"
                      >
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-surface-container relative shrink-0">
                          <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-label-sm text-label-sm font-semibold text-on-surface truncate max-w-[150px]">
                              {photo.name}
                            </span>
                            {photo.verified && (
                              <Icon name="verified" size={14} className="text-tertiary" />
                            )}
                          </div>
                          <span className="font-body-sm text-body-sm text-outline">
                            {photo.size} • Uploaded
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="p-1 rounded hover:bg-surface-container text-outline hover:text-error ml-2"
                        >
                          <Icon name="close" size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Notification Preferences */}
                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    Contact & Notification Preferences
                  </span>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={smsAlerts}
                        onChange={e => setSmsAlerts(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-primary-container focus:ring-primary-container accent-primary-container"
                      />
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-medium">
                          Send SMS updates to my registered phone number
                        </span>
                        <span className="font-body-sm text-body-sm text-outline">
                          Alerts sent upon technician assignment, arrival, and repair completion.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={directContact}
                        onChange={e => setDirectContact(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-primary-container focus:ring-primary-container accent-primary-container"
                      />
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-medium">
                          Allow technician to contact me directly for access
                        </span>
                        <span className="font-body-sm text-body-sm text-outline">
                          Technician will only initiate phone contact within scheduled work hours.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-space-md pt-space-sm">
                  <div className="flex items-center gap-space-sm w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto h-10 px-space-md rounded-lg font-label-md text-label-md bg-surface-container hover:bg-surface-variant text-on-surface-variant transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Report draft saved to your student profile.')}
                      className="w-full sm:w-auto h-10 px-space-md rounded-lg font-label-md text-label-md bg-surface-container-lowest hover:bg-surface-container text-on-surface transition-colors shadow-sm border border-surface-container-low"
                    >
                      Save as Draft
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-10 px-space-xl rounded-lg font-label-lg text-label-lg font-semibold bg-primary-container hover:bg-primary text-on-primary flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Icon name="check_circle" size={18} />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column (4 Cols) Sticky Live Summary & Campus Escalation */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg lg:sticky lg:top-24">
            {/* Live Sync Report Summary Preview Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md border border-surface-container-low">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                  Report Summary Preview
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                  Live Sync
                </span>
              </div>

              <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                    <Icon name={getCategoryIcon(category)} size={14} />
                    <span>{category}</span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                      priority === 'Urgent'
                        ? 'bg-error-container text-on-error-container'
                        : priority === 'Medium'
                        ? 'bg-surface-container-high text-on-surface'
                        : 'bg-surface-container text-secondary'
                    }`}
                  >
                    {priority === 'Urgent' ? 'High / Urgent' : priority}
                  </span>
                </div>

                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight mt-1">
                  {title.trim() || 'Untitled Maintenance Issue'}
                </h3>

                <div className="flex flex-col gap-1 text-on-surface-variant font-body-sm text-body-sm">
                  <div className="flex items-center gap-1.5">
                    <Icon name="apartment" size={16} className="text-outline" />
                    <span>{building || 'Not Selected'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="room" size={16} className="text-outline" />
                    <span>{location || 'Not Specified'}</span>
                  </div>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 bg-surface-container-lowest p-2 rounded">
                  {description.trim() || 'No description provided.'}
                </p>

                <div className="flex items-center justify-between pt-2 text-outline font-label-sm text-label-sm border-t border-surface-container">
                  <span className="flex items-center gap-1">
                    <Icon name="attach_file" size={14} />
                    <span>{uploadedPhotos.length} attachments</span>
                  </span>
                  <span>Estimated SLA: &lt; 2h</span>
                </div>
              </div>

              {/* Campus Escalation Protocol */}
              <div className="flex flex-col gap-space-xs pt-1">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Campus Escalation Protocol
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  If there is standing electrical water or structural hazard threat, immediately activate the emergency physical dispatch line.
                </p>
                <div className="flex items-center justify-between bg-error-container text-on-error-container p-space-sm rounded-lg mt-1 font-label-md text-label-md">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Icon name="phone_in_talk" size={18} />
                    <span>Facilities Hot-Desk</span>
                  </div>
                  <a href="tel:5550199" className="font-bold underline cursor-pointer">
                    (555) 0199
                  </a>
                </div>
              </div>

              {/* CampusFix Resolution Guarantee */}
              <div className="bg-surface-container p-space-md rounded-lg flex items-start gap-space-sm">
                <Icon name="shield" size={22} className="text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                    CampusFix Resolution Guarantee
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Reports logged through authenticated student credentials receive automated tracking, photographic logs, and verified sign-off.
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Zone Dispatches Card */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-2 border border-surface-container-low">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                Recent Zone Dispatches
              </span>
              <div className="flex items-center justify-between py-1 border-b border-surface-container-low">
                <span className="font-body-sm text-body-sm text-on-surface truncate">
                  Warren Tower #402 (HVAC)
                </span>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                  Resolved
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-body-sm text-body-sm text-on-surface truncate">
                  Science Hall Lab 3B (Breaker)
                </span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  En Route
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
