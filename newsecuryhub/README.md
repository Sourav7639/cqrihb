# SecuryHub Split Application

`newsecuryhub` converts the original single-page SecuryHub experience into a multi-page Next.js site while preserving the Tailwind design language and interactions. It supports two operational modes:

- **Demo mode (default):** runs entirely in the browser using `localStorage` for persistence and seeded demo accounts.
- **Production mode:** uses Supabase for authentication, Postgres data, and storage via Netlify Functions.

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

### Demo Accounts

| Role | Email | Password |
| --- | --- | --- |
| Researcher | researcher@demo.securyhub | (leave blank) |
| Organization | org@demo.securyhub | (leave blank) |
| Admin | admin@demo.securyhub | (leave blank) |

Demo mode seeds programs and provides dashboards to exercise the full workflow (program creation, submissions, triage, analytics).

## Switching Modes

1. Copy `.env.example` to `.env.local`.
2. For demo mode, keep `NEXT_PUBLIC_APP_MODE=demo`.
3. For production mode, set:
   - `NEXT_PUBLIC_APP_MODE=production`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE`
   - `RESEND_API_KEY` (optional notifications)

Production mode expects Supabase tables that match the schema defined in this README.

## Database Schema (Supabase / Postgres)

```
users (id uuid primary key, role text, name text, email text unique, created_at timestamptz)
organizations (id uuid primary key, owner_user_id uuid references users)
programs (id uuid primary key, owner_org_id uuid references organizations, name text, summary text, policy text, rewards text, created_at timestamptz, updated_at timestamptz)
program_scopes (id uuid primary key, program_id uuid references programs, value text)
submissions (id uuid primary key, program_id uuid references programs, researcher_user_id uuid references users, title text, severity text, impact text, steps text, references text, status text, reward numeric, created_at timestamptz, updated_at timestamptz)
submission_comments (id uuid primary key, submission_id uuid references submissions, author_user_id uuid references users, body text, created_at timestamptz)
submission_attachments (id uuid primary key, submission_id uuid references submissions, url text, name text, size numeric, created_at timestamptz)
notifications (id uuid primary key, user_id uuid references users, type text, data jsonb, read_at timestamptz)
audit_logs (id uuid primary key, actor_user_id uuid references users, action text, entity text, entity_id uuid, data jsonb, created_at timestamptz)
```

## Netlify Deployment

1. Configure environment variables in Netlify (`NEXT_PUBLIC_APP_MODE`, `NEXT_PUBLIC_SUPABASE_URL`, etc.).
2. Add a Netlify build hook with:
   ```
   npm install
   npm run build
   ```
3. Ensure Netlify Functions directory is `netlify/functions` (preconfigured in `netlify.toml`).
4. The contact form uses Netlify Forms attributes for handling submissions.

## Hostinger Deployment

- **Static hosting plan:** build locally using `npm run build` and upload the `out/` directory plus the `netlify/functions` folder to a Node-capable environment (or proxy to Netlify Functions).
- **Node/Next.js plan:** run `npm install` then `npm run build` & `npm start`. Configure environment variables the same as Netlify. For serverless APIs, deploy Netlify Functions separately or adapt them to Hostinger Functions.

## Netlify Functions

Serverless functions power the production API surface:

- `programs` (GET, POST)
- `programs-id` (GET)
- `programs-id-submissions` (GET, POST)
- `submissions-id` (PATCH)
- `submissions-id-comments` (POST)
- `me` (GET)
- `stats` (GET)

Update these functions if you extend the schema. Each function expects Supabase credentials via environment variables.

## Contact Form

The contact page includes `data-netlify="true"` attributes so Netlify Forms can capture submissions. On non-Netlify hosts, the form falls back to an inline success screen.

## Scripts

- `npm run dev` – development server.
- `npm run build` – production build with static export.
- `npm run start` – Next.js production server (requires Node host).
- `npm run format` – Prettier formatting.

## Testing Notes

This repository relies on manual QA for layout fidelity and workflow coverage. Ensure you validate navigation, mobile menu toggles, tab components, and modal interactions after any change.
