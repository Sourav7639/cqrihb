import { DemoDatabase } from '../types';

export const demoSeed: DemoDatabase = {
  users: [
    {
      id: 'user-researcher-1',
      email: 'researcher@demo.securyhub',
      role: 'researcher',
      name: 'Avery Researcher',
      createdAt: new Date().toISOString()
    },
    {
      id: 'user-organization-1',
      email: 'org@demo.securyhub',
      role: 'organization',
      name: 'SecuryHub Org',
      createdAt: new Date().toISOString(),
      organizationId: 'org-1'
    },
    {
      id: 'user-admin-1',
      email: 'admin@demo.securyhub',
      role: 'admin',
      name: 'Admin User',
      createdAt: new Date().toISOString()
    }
  ],
  programs: [
    {
      id: 'program-1',
      ownerOrgId: 'org-1',
      name: 'SecuryHub Core',
      summary: 'Protect core SecuryHub platform services and infrastructure.',
      policy: 'Follow responsible disclosure guidelines and avoid production disruptions.',
      rewards: 'Up to $10,000 for critical vulnerabilities.',
      scopes: ['app.securyhub.com', 'api.securyhub.com'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'program-2',
      ownerOrgId: 'org-1',
      name: 'SecuryHub Mobile',
      summary: 'Mobile applications for Android and iOS.',
      policy: 'Test on personal accounts only. No production data exfiltration.',
      rewards: 'Up to $5,000 for critical submissions.',
      scopes: ['android app', 'ios app'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  submissions: [],
  submissionComments: [],
  notifications: [],
  auditLogs: []
};
