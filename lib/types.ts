export type TicketCategory =
  | 'Plumbing'
  | 'Electrical'
  | 'Furniture'
  | 'Wi-Fi / Tech'
  | 'HVAC'
  | 'Sanitation'
  | 'Exterior / Grounds';

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TicketStatus = 'Pending' | 'In Progress' | 'Waiting on Parts' | 'Resolved';

export interface ActivityLog {
  id: string;
  type: 'report' | 'ack' | 'dispatch' | 'parts' | 'safety' | 'resolved' | 'comment';
  title: string;
  time: string;
  author: string;
  note: string;
}

export interface PipelineStep {
  step: number;
  label: string;
  status: 'completed' | 'active' | 'upcoming';
  time: string;
  actor: string;
}

export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  building: string;
  location: string;
  priority: TicketPriority;
  status: TicketStatus;
  reportedBy: string;
  createdAt: string;
  technician?: string;
  eta?: string;
  upvotes: number;
  userUpvoted?: boolean;
  description: string;
  hazards?: string[];
  flowRate?: string;
  affectedArea?: string;
  moistureLevel?: string;
  images?: string[];
  pipeline: PipelineStep[];
  activityLogs: ActivityLog[];
  sector?: 'North Campus' | 'South Quad' | 'Central Science' | 'Student Housing';
}

export interface Technician {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'on_break' | 'dispatched';
  avatar: string;
  ordersCount: number;
  sector: string;
  phone: string;
}

export interface Building {
  id: string;
  name: string;
  code: string;
  sector: string;
  activeTickets: number;
  healthScore: number;
  status: 'Nominal' | 'Attention' | 'Critical';
  image: string;
  floors: number;
  emergencyLead: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  ticketId?: string;
  type: 'alert' | 'update' | 'resolve' | 'dispatch';
}
