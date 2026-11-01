import { Ticket, Technician, Building, AppNotification } from './types';

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-1',
    name: 'Dave M.',
    role: 'Senior HVAC & Plumbing Lead',
    status: 'dispatched',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDccmWcKtE-xzYM7IfzP790ST-b0F1bGA3aKgcNauVe206fSLf7nedtIf_OgjpeQsWzxWVMzLizvruOFOgJ_stxcrPdykRBlNdcWAr59BRjqknAtGAZGXSBFySbgeov22r14GcjtcN81Rq9p18DMUNRE1mkgAJdJH48bvaUJD8zd1VbXwC7mh0ERkljVaX4ElL3CPBEPMlYiaLL74vGV8B3Yhr6e8siuHdracEaAErz',
    ordersCount: 3,
    sector: 'Central Science',
    phone: '(555) 012-4411'
  },
  {
    id: 'tech-2',
    name: 'Sarah K.',
    role: 'Electrical & IT Systems Lead',
    status: 'active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDot8r-xXdspGrhLAPDvTe6_tvWU6XLSjXR2Csvav2VWM5XSt4a3hSZgSC5sQ_NIGhpfQJxXJboxVIDM3KOV8cmzsaRl49EadxLmn_SRHlgTddvXV_DQJczC37SyrzjvbvZIJDN1V_Hk7NS6WVp9YnBpKV6nIuMcsD9wK9279Fg5jdB6Z5a1Rn9FHoIgwosiGriCEHulO9jChjb6K6hR6JlXopoDb1072BmEQEuhsRW',
    ordersCount: 2,
    sector: 'Student Housing',
    phone: '(555) 018-9923'
  },
  {
    id: 'tech-3',
    name: 'Tom H.',
    role: 'Structural & Carpentry Specialist',
    status: 'active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB52qAp-BMU_FDv3ujXtGtxpUDJ-6fZYcn5h-Br5VHL7KHsG_1qeLUObosCdtBfTTsQlaXUQqsJ9KfAyQ8I8RngRURxNNYb8kcbi1cCbNrkrdxLuZYkLF-Sbvkf5tmd_9ctIhMn0Xo3UKQJIyyxFC8vMMkWOFbaSwo3qknwx6AMKxcD_8KFQIy0y9i9eAMVZwrgVtJaYIR6LuXc_m58ElBYm2JSolNgzoEylLZKVAI0',
    ordersCount: 1,
    sector: 'North Campus',
    phone: '(555) 014-3388'
  },
  {
    id: 'tech-4',
    name: 'Carlos R.',
    role: 'Campus Infrastructure & Mechanics',
    status: 'dispatched',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgQEf2LLW6jqLpETquyufgiokV8pyLugd6K0GAX_ApX7RXf5QjFvige80l-6E9lBXzaiujDqNOghp8kRR_VvQ_F_m-Sv9G7j1si-SCaPU9sNbpXvhB9h_jVxY4FjDUAOuf-k8AH19idUPRLwKqrvkeRWdW3aODChSKhn592R78-hPSKFsEiwPCIZ9Od8j-rIcMM7SFpeSNmVHwIk7cCNnypPVlhIy76sUn0y60NTuV',
    ordersCount: 2,
    sector: 'South Quad',
    phone: '(555) 019-7731'
  },
  {
    id: 'tech-5',
    name: 'Elena V.',
    role: 'Grounds, Safety & Sanitation Specialist',
    status: 'active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_OdKFgE6rfI5J1AqopqK5zf_aevBMGDx9KU3M_IqgxJnWbtopW5yFRL5_gheNt7r7s-6QumI2WzYN_FrDgvb2R00wd8LvkNR_sPh23mswB-U-239akD1PYe5Kz0PmJ1d2IzZ5rTpgksTIl1FW3LQGExuondejX49lTEM0waI4aw1uIH1dijGRygSxLL9H1JQoCE_vymaOesYnSd8Id-9Af8eI8sZVxXnzDjUWte0l',
    ordersCount: 1,
    sector: 'North Campus',
    phone: '(555) 017-5510'
  },
  {
    id: 'tech-6',
    name: 'Marcus Chen',
    role: 'Master Plumber & Operations Specialist',
    status: 'on_break',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVyFx5Ih5Igm1A2XDecqMFSGZljPuSVBCrtamWCoIHqeoN5SfwaiBd0ySTcVTqrDhFd0xIeoy12COKFrrfOvILhGDSh07KKGGFMSqP_jgQIeaIsw4B-z0uaZS3439NRxPzbN9--ObpcZ1qF6tMTtoCSDH76mBmBzZ9ZMGRwB1FVEot1h21gi2M2NNR6Jsxg0OUgHB__InbtBW1LFxBukrqrudY-WlO9ty52lAAmb-l',
    ordersCount: 0,
    sector: 'Central Science',
    phone: '(555) 015-8822'
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'CF-2024-8841',
    title: 'Severe Water Leak Near 2nd Floor Restroom & Water Fountain',
    category: 'Plumbing',
    building: 'Central Campus Library',
    location: 'Central Library • 2nd Floor East Wing (opp. Room 210)',
    priority: 'Urgent',
    status: 'In Progress',
    reportedBy: 'Alex Rivera (Resident ID #4928)',
    createdAt: 'Oct 23, 2024, 09:15 AM',
    technician: 'Dave M. (Plumbing Lead)',
    eta: 'Today, 2:00 PM',
    upvotes: 28,
    userUpvoted: true,
    sector: 'Central Science',
    description:
      'Significant water pooling has manifested in the 2nd Floor hallway corridor of the Central Library, directly opposite the entrance to East Wing Study Room 210. The fountain fixture\'s secondary feedline ruptured under continuous water pressure, resulting in active seepage across commercial linoleum flooring.',
    flowRate: '~1.2 Gal / Min',
    affectedArea: '220 Sq. Ft',
    moistureLevel: 'High (Level 4)',
    hazards: [
      'High-risk slip hazard spanning approximately 18 feet along major egress path.',
      'Water proximity to baseboard electrical power raceways near Study Cubicle 212.',
      'Ceiling plaster soaking noted directly below on Floor 1 stacks (Section 14B).'
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYp2azrLxP7wNG1sFDK514PyAzouyYxDMey8P6ArnzcyUw_jNptlbEZjDGEa2_yofJWEDRJ4QFxI3v3Qexq4dp2NmIapw-76mO6NMvAT0_GoVdVvqrgoDl2sj2u4pscHXGwnmodzPFhRYWZu0U8i-TATU3VTxMPaslTleEmdGv7-TwbfKThocEoCIGon5hrFqkcgyx6IBPCnA5TIEvqzIeT52o_wfhgDYtQ2SjgVRo',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8mTz99_DdQEn7mn4bzpULC9eyc53bqwc_upz4S42xcuw4hKdBTdMKQU6CpvB8duT8qXt1_ZCosH9wVOc2iLXZRx_7F9sDQBYdWFd6oUwUsWdoLR52ldPUf2gveBEwLf65Q5NwcROzJpXYYL2k3hLo13c9PGhOOXONpWh6mPbOuvcJS7jesyJg6kVmaiaID-MvNOm8tlsdxNYqSjoTiPEEiXhstsj5T21KuVuijWnf'
    ],
    pipeline: [
      { step: 1, label: 'Reported', status: 'completed', time: 'Oct 23, 2024 at 09:15 AM', actor: 'Logged by Alex Rivera' },
      { step: 2, label: 'Acknowledged', status: 'completed', time: 'Oct 23, 2024 at 09:40 AM', actor: 'Dispatcher Marcus (HQ)' },
      { step: 3, label: 'In Progress', status: 'active', time: 'Oct 24, 2024 at 08:30 AM', actor: 'Lead Tech Dave M. on site' },
      { step: 4, label: 'Resolved', status: 'upcoming', time: 'Estimated: Today 2:00 PM', actor: 'Pending post-repair sign-off' }
    ],
    activityLogs: [
      {
        id: 'log-1',
        type: 'parts',
        title: 'Parts Requested from Central Warehouse',
        time: 'Today • 10:15 AM',
        author: 'Lead Tech Dave M.',
        note: 'Requested 3/4-inch high pressure copper compression fitting & industrial water extractor vacuum.'
      },
      {
        id: 'log-2',
        type: 'safety',
        title: 'Safety Perimeter & Wet Floor Cones Placed',
        time: 'Today • 08:45 AM',
        author: 'Staff Tech Jordan T.',
        note: 'Cordoned 18-foot radius with high-visibility hazard cones and diverted foot traffic to West Wing stairs.'
      },
      {
        id: 'log-3',
        type: 'dispatch',
        title: 'Ticket Triaged & Field Engineer Dispatched',
        time: 'Oct 23 • 09:40 AM',
        author: 'HQ Dispatcher Marcus',
        note: 'Escalated to Priority 1 due to library study room proximity and valuable book stack protection.'
      }
    ]
  },
  {
    id: 'CF-8921',
    title: 'Broken AC Unit in Room 304 Warren Hall',
    category: 'HVAC',
    building: 'Warren Tower',
    location: 'Warren Hall • 3rd Floor, Room 304',
    priority: 'Urgent',
    status: 'In Progress',
    reportedBy: 'Samira K. (Hall B Resident)',
    createdAt: 'Oct 24, 2024, 11:20 AM',
    technician: 'Dave M. (Crew #04)',
    eta: 'Today 3:30 PM',
    upvotes: 14,
    sector: 'Student Housing',
    description:
      'Air handler unit in Dorm Room 304 stopped blowing cold air and emits a loud rhythmic grinding sound. Room ambient temp is currently 83°F with poor airflow affecting 4 residents in suite.',
    hazards: ['Compressor heat buildup', 'Severe ambient heat in closed dorm room'],
    pipeline: [
      { step: 1, label: 'Reported', status: 'completed', time: 'Oct 24, 11:20 AM', actor: 'Samira K.' },
      { step: 2, label: 'Acknowledged', status: 'completed', time: 'Oct 24, 11:35 AM', actor: 'Dispatch System' },
      { step: 3, label: 'In Progress', status: 'active', time: 'Oct 24, 01:10 PM', actor: 'Dave M. en route' },
      { step: 4, label: 'Resolved', status: 'upcoming', time: 'Today 3:30 PM', actor: 'Pending motor swap' }
    ],
    activityLogs: [
      {
        id: 'log-21',
        type: 'dispatch',
        title: 'Crew #04 Dispatched to Warren Hall',
        time: 'Just now',
        author: 'HQ Dispatcher Marcus',
        note: 'En route to Warren Hall (Room 304). Replacement motor arrived from supplier.'
      }
    ]
  },
  {
    id: 'CF-8914',
    title: 'Water Leak Near Library Restroom 2A',
    category: 'Plumbing',
    building: 'Central Campus Library',
    location: 'Central Library • 2nd Floor East Wing',
    priority: 'High',
    status: 'Pending',
    reportedBy: 'Library Staff',
    createdAt: 'Oct 23, 2024, 08:30 AM',
    eta: 'Awaiting triage',
    upvotes: 28,
    sector: 'Central Science',
    description:
      'Unattended seepage coming from wall cavity behind Restroom 2A fixture. Slow spreading onto common walkway carpet tile.',
    pipeline: [
      { step: 1, label: 'Reported', status: 'completed', time: 'Oct 23, 08:30 AM', actor: 'Library Staff' },
      { step: 2, label: 'Acknowledged', status: 'active', time: 'Oct 23, 09:00 AM', actor: 'Triage Queue' },
      { step: 3, label: 'In Progress', status: 'upcoming', time: 'Pending assignment', actor: 'Unassigned' },
      { step: 4, label: 'Resolved', status: 'upcoming', time: 'TBD', actor: 'Pending work' }
    ],
    activityLogs: [
      {
        id: 'log-14',
        type: 'report',
        title: 'Report Logged in High Priority Queue',
        time: 'Oct 23 • 08:30 AM',
        author: 'Desk Attendant Liam',
        note: 'Water seep noticed during morning opening inspection.'
      }
    ]
  },
  {
    id: 'CF-8882',
    title: 'Slow Wi-Fi Connectivity in Dining Commons',
    category: 'Wi-Fi / Tech',
    building: 'Student Union Center',
    location: 'Student Union • Food Court Main Seating',
    priority: 'Medium',
    status: 'In Progress',
    reportedBy: 'Campus Dining Association',
    createdAt: 'Oct 20, 2024, 01:15 PM',
    technician: 'Sarah K. (Tech Crew #02)',
    eta: 'Tomorrow 10:00 AM',
    upvotes: 42,
    userUpvoted: true,
    sector: 'South Quad',
    description:
      'High packet loss and latency exceeding 400ms during peak lunch hours (11:30 AM - 1:30 PM). Students unable to access course portal or process contactless payment.',
    pipeline: [
      { step: 1, label: 'Reported', status: 'completed', time: 'Oct 20, 01:15 PM', actor: 'Campus Dining' },
      { step: 2, label: 'Acknowledged', status: 'completed', time: 'Oct 20, 02:00 PM', actor: 'IT Network Ops' },
      { step: 3, label: 'In Progress', status: 'active', time: 'Oct 21, 09:00 AM', actor: 'Sarah K. installing AP' },
      { step: 4, label: 'Resolved', status: 'upcoming', time: 'Tomorrow 10:00 AM', actor: 'Bandwidth stress test' }
    ],
    activityLogs: [
      {
        id: 'log-82',
        type: 'comment',
        title: 'Configuring Repeater Nodes',
        time: '28m ago',
        author: 'Sarah K. (IT Tech)',
        note: 'Upgrading Access Point AP-04 firmware and re-balancing 5GHz channel allocation.'
      }
    ]
  },
  {
    id: 'CF-8890',
    title: 'Unstable Desk Legs in Lecture Hall B12',
    category: 'Furniture',
    building: 'Science Hall',
    location: 'Science Complex • B12 Lecture Hall, Row 4',
    priority: 'Low',
    status: 'Resolved',
    reportedBy: 'Prof. H. Vance',
    createdAt: 'Oct 21, 2024',
    technician: 'Tom H. (Carpentry Specialist)',
    eta: 'Completed',
    upvotes: 7,
    sector: 'Central Science',
    description:
      'Wobbly auditorium table tier #4 rocking when students take notes. Welded and reinforced leg bracket with heavy-duty hex bolts.',
    pipeline: [
      { step: 1, label: 'Reported', status: 'completed', time: 'Oct 21', actor: 'Prof. H. Vance' },
      { step: 2, label: 'Acknowledged', status: 'completed', time: 'Oct 21', actor: 'Facilities HQ' },
      { step: 3, label: 'In Progress', status: 'completed', time: 'Oct 22', actor: 'Tom H.' },
      { step: 4, label: 'Resolved', status: 'completed', time: 'Oct 22, 04:00 PM', actor: 'Signed off by Dept Admin' }
    ],
    activityLogs: [
      {
        id: 'log-90',
        type: 'resolved',
        title: 'Bracket Reinforced & Surface Levelled',
        time: 'Oct 22 • 04:00 PM',
        author: 'Tom H.',
        note: 'Installed reinforced structural bracket. Load test passed up to 150 lbs.'
      }
    ]
  },
  {
    id: 'CF-8849',
    title: 'Burned Out Overhead Light in Stairwell C',
    category: 'Electrical',
    building: 'Engineering Building',
    location: 'Engineering Building • Stairwell C, Levels 2-3',
    priority: 'Medium',
    status: 'Resolved',
    reportedBy: 'Night Security Guard',
    createdAt: 'Oct 18, 2024',
    technician: 'Sarah K. (Electrical Crew #02)',
    eta: 'Completed',
    upvotes: 19,
    sector: 'North Campus',
    description:
      'Dual fluorescent tubes dead, resulting in dark stair treads near fire exit door. Replaced with high-efficiency 4000K LED fixture.',
    pipeline: [
      { step: 1, label: 'Reported', status: 'completed', time: 'Oct 18', actor: 'Night Security' },
      { step: 2, label: 'Acknowledged', status: 'completed', time: 'Oct 18', actor: 'Triage' },
      { step: 3, label: 'In Progress', status: 'completed', time: 'Oct 19', actor: 'Sarah K.' },
      { step: 4, label: 'Resolved', status: 'completed', time: 'Oct 19, 02:30 PM', actor: 'Tested' }
    ],
    activityLogs: [
      {
        id: 'log-49',
        type: 'resolved',
        title: 'LED Ballast Replaced & Tested',
        time: 'Oct 19 • 02:30 PM',
        author: 'Sarah K.',
        note: 'Emergency illumination backup battery also verified functional.'
      }
    ]
  },
  {
    id: 'CF-8935',
    title: 'Main Steam Valve Hissing in Boiler Annex',
    category: 'HVAC',
    building: 'Science Hall',
    location: 'Science Complex • Sub-Basement Boiler Room',
    priority: 'Urgent',
    status: 'Pending',
    reportedBy: 'Facilities Custodian',
    createdAt: 'Today, 07:15 AM',
    eta: 'Immediate dispatch required',
    upvotes: 31,
    sector: 'Central Science',
    description:
      'High pressure steam pressure relief valve emitting high pitched whistling and visible vapor leak. Pressure gauge reading 42 PSI (threshold 45 PSI).',
    pipeline: [
      { step: 1, label: 'Reported', status: 'completed', time: 'Today, 07:15 AM', actor: 'Facilities Custodian' },
      { step: 2, label: 'Acknowledged', status: 'active', time: 'Today, 07:25 AM', actor: 'Critical Escalation Bot' },
      { step: 3, label: 'In Progress', status: 'upcoming', time: 'Awaiting boiler technician', actor: 'Unassigned' },
      { step: 4, label: 'Resolved', status: 'upcoming', time: 'Estimated 2 hours', actor: 'Pressure clearance' }
    ],
    activityLogs: [
      {
        id: 'log-35',
        type: 'report',
        title: 'Emergency Safety Alert Triggered',
        time: 'Today • 07:25 AM',
        author: 'Safety Monitoring System',
        note: 'Automated pressure anomaly flagged. District supervisor notified via SMS.'
      }
    ]
  },
  {
    id: 'CF-8932',
    title: 'Elevator #2 Button Panel Unresponsive',
    category: 'Electrical',
    building: 'Student Union Center',
    location: 'Student Union • Passenger Elevator #2 (Floors 1-4)',
    priority: 'High',
    status: 'In Progress',
    reportedBy: 'Student Union Information Desk',
    createdAt: 'Oct 23, 2024, 03:40 PM',
    technician: 'Carlos R. (Infrastructure)',
    eta: 'Today, 4:00 PM',
    upvotes: 16,
    sector: 'South Quad',
    description:
      'Floors 3 and 4 call buttons do not light up or register calls from interior car panel. Elevator currently locked to floor 1 for safety inspection.',
    pipeline: [
      { step: 1, label: 'Reported', status: 'completed', time: 'Oct 23, 03:40 PM', actor: 'Information Desk' },
      { step: 2, label: 'Acknowledged', status: 'completed', time: 'Oct 23, 04:00 PM', actor: 'Campus Dispatch' },
      { step: 3, label: 'In Progress', status: 'active', time: 'Oct 24, 09:30 AM', actor: 'Carlos R. testing relay' },
      { step: 4, label: 'Resolved', status: 'upcoming', time: 'Today 4:00 PM', actor: 'State inspection test' }
    ],
    activityLogs: [
      {
        id: 'log-32',
        type: 'parts',
        title: 'Microswitch Circuit Board Replacement',
        time: 'Today • 11:00 AM',
        author: 'Carlos R.',
        note: 'Replaced charred PCB contact pad for upper level relay bank.'
      }
    ]
  }
];

export const INITIAL_BUILDINGS: Building[] = [
  {
    id: 'b-warren',
    name: 'Warren Tower',
    code: 'WT-01',
    sector: 'Student Housing',
    activeTickets: 4,
    healthScore: 92,
    status: 'Nominal',
    floors: 14,
    emergencyLead: 'Capt. Daniels (Ext. 201)',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-science',
    name: 'Science Hall & Annex',
    code: 'SCI-04',
    sector: 'Central Science',
    activeTickets: 7,
    healthScore: 78,
    status: 'Attention',
    floors: 6,
    emergencyLead: 'Dr. Katherine Bell (Ext. 419)',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-union',
    name: 'Student Union Center',
    code: 'SU-02',
    sector: 'South Quad',
    activeTickets: 5,
    healthScore: 86,
    status: 'Nominal',
    floors: 4,
    emergencyLead: 'Marcus Alvarez (Ext. 110)',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-library',
    name: 'Central Campus Library',
    code: 'LIB-01',
    sector: 'Central Science',
    activeTickets: 6,
    healthScore: 81,
    status: 'Attention',
    floors: 5,
    emergencyLead: 'Eleanor Vance (Ext. 305)',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b-north',
    name: 'North Dormitory Complex',
    code: 'ND-08',
    sector: 'North Campus',
    activeTickets: 2,
    healthScore: 96,
    status: 'Nominal',
    floors: 8,
    emergencyLead: 'Sgt. Miller (Ext. 224)',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Technician Dispatched',
    description: 'Dave M. assigned to Ticket #CF-2024-8841 (Severe Water Leak).',
    time: '12m ago',
    read: false,
    ticketId: 'CF-2024-8841',
    type: 'dispatch'
  },
  {
    id: 'notif-2',
    title: 'High Priority Alert',
    description: 'New emergency report logged: Steam valve in Science Hall.',
    time: '45m ago',
    read: false,
    ticketId: 'CF-8935',
    type: 'alert'
  },
  {
    id: 'notif-3',
    title: 'Issue Resolved',
    description: 'Stairwell C lighting in Engineering Building marked complete.',
    time: '2h ago',
    read: false,
    ticketId: 'CF-8849',
    type: 'resolve'
  }
];
