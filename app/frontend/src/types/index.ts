export interface User {
  id: string;
  name: string;
  email: string;
  role: 'volunteer' | 'organization' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Organization {
  id: string;
  userId: string;
  name: string;
  description: string;
  contact: string;
  logo?: string;
}

export interface Task {
  id: string;
  organizationId: string;
  organization: Organization;
  title: string;
  description: string;
  date: Date;
  durationHours: number;
  location: string;
  slots: number;
  spotsAvailable?: number; // Available spots remaining
  createdAt: Date;
  active: boolean;
  image?: string;
  category?: string;
  skills?: string[]; // Required or preferred skills
  participants?: number; // Current number of participants
}

export interface Application {
  id: string;
  taskId: string;
  volunteerId: string;
  volunteer: User;
  status: 'pending' | 'approved' | 'declined' | 'attended';
  appliedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface VolunteerBadge {
  id: string;
  volunteerId: string;
  badge: Badge;
  awardedAt: Date;
}