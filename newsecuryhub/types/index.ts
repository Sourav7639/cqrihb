export type Role = 'researcher' | 'organization' | 'admin';

export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  role: Role;
  name: string;
  organizationId?: string;
  createdAt: string;
}

export interface Program {
  id: string;
  ownerOrgId: string;
  name: string;
  summary: string;
  policy: string;
  rewards: string;
  scopes: string[];
  createdAt: string;
  updatedAt: string;
}

export type SubmissionStatus = 'submitted' | 'in-review' | 'triaged' | 'accepted' | 'rejected';
export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface Submission {
  id: string;
  programId: string;
  researcherUserId: string;
  title: string;
  severity: Severity;
  impact: string;
  steps: string;
  references: string;
  status: SubmissionStatus;
  reward: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionComment {
  id: string;
  submissionId: string;
  authorUserId: string;
  body: string;
  createdAt: string;
}

export interface SubmissionAttachment {
  id: string;
  submissionId: string;
  url: string;
  name: string;
  size: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  data: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorUserId: string;
  action: string;
  entity: string;
  entityId: string;
  data: Record<string, unknown>;
  createdAt: string;
}

export interface DemoDatabase {
  users: User[];
  programs: Program[];
  submissions: Submission[];
  submissionComments: SubmissionComment[];
  notifications: Notification[];
  auditLogs: AuditLog[];
}
