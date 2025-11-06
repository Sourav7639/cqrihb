import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useDemoStore } from '../../store/demoStore';
import { SubmissionStatus } from '../../types';

const statuses: SubmissionStatus[] = ['submitted', 'in-review', 'triaged', 'accepted', 'rejected'];

export default function OrganizationDashboardPage() {
  const { programs, submissions, createProgram, updateSubmissionStatus, auth } = useDemoStore();
  const [formState, setFormState] = useState({
    name: '',
    summary: '',
    policy: '',
    rewards: '',
    scopes: ''
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateProgram = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createProgram({
        ownerOrgId: auth.user?.organizationId || 'org-1',
        name: formState.name,
        summary: formState.summary,
        policy: formState.policy,
        rewards: formState.rewards,
        scopes: formState.scopes.split(',').map((scope) => scope.trim()).filter(Boolean)
      });
      setMessage('Program created (demo mode).');
      setFormState({ name: '', summary: '', policy: '', rewards: '', scopes: '' });
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Organization Dashboard | SecuryHub</title>
      </Head>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Organization Dashboard</h1>
          <p className="text-white/70">
            Manage your programs and triage submissions across researchers.
          </p>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr,1fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Active programs</h2>
              <div className="space-y-4">
                {programs.map((program) => (
                  <article key={program.id} className="rounded-3xl border border-white/10 bg-black/40 p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{program.name}</h3>
                        <p className="text-sm text-white/60">{program.summary}</p>
                      </div>
                      <div className="text-xs uppercase tracking-widest text-white/50">
                        Updated {new Date(program.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-white/70">
                      <p className="text-xs uppercase tracking-widest text-white/50">Scopes</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {program.scopes.map((scope) => (
                          <li key={scope} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                            {scope}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Incoming submissions</h2>
              <div className="space-y-4">
                {submissions.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center text-white/60">
                    No submissions yet.
                  </div>
                ) : (
                  submissions.map((submission) => (
                    <article key={submission.id} className="space-y-4 rounded-3xl border border-white/10 bg-black/40 p-8">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{submission.title}</h3>
                          <p className="text-sm text-white/60">Severity {submission.severity.toUpperCase()}</p>
                        </div>
                        <span className="text-xs uppercase tracking-widest text-brand-200">
                          {submission.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="grid gap-4 text-sm text-white/70 lg:grid-cols-2">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/50">Impact</p>
                          <p className="mt-1 whitespace-pre-line">{submission.impact}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/50">Steps</p>
                          <p className="mt-1 whitespace-pre-line">{submission.steps}</p>
                        </div>
                        <div className="lg:col-span-2">
                          <p className="text-xs uppercase tracking-widest text-white/50">References</p>
                          <p className="mt-1 whitespace-pre-line">{submission.references}</p>
                        </div>
                      </div>
                      <form
                        className="grid gap-4 md:grid-cols-[1fr,1fr,auto]"
                        onSubmit={async (event) => {
                          event.preventDefault();
                          const formData = new FormData(event.currentTarget);
                          const status = formData.get('status') as SubmissionStatus;
                          const reward = formData.get('reward') ? Number(formData.get('reward')) : null;
                          await updateSubmissionStatus(submission.id, status, reward);
                          setMessage('Submission updated (demo mode).');
                        }}
                      >
                        <select
                          name="status"
                          defaultValue={submission.status}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status} className="bg-gray-900 text-white">
                              {status.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <input
                          name="reward"
                          type="number"
                          placeholder="Reward"
                          defaultValue={submission.reward ?? ''}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                        />
                        <button
                          type="submit"
                          className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
                        >
                          Update
                        </button>
                      </form>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-8">
            <h2 className="text-2xl font-semibold">Create a program</h2>
            {message && <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">{message}</div>}
            <form className="space-y-4" onSubmit={handleCreateProgram}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  Program name
                </label>
                <input
                  id="name"
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="summary" className="text-sm font-semibold">
                  Summary
                </label>
                <textarea
                  id="summary"
                  value={formState.summary}
                  onChange={(event) => setFormState((prev) => ({ ...prev, summary: event.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="policy" className="text-sm font-semibold">
                  Policy
                </label>
                <textarea
                  id="policy"
                  value={formState.policy}
                  onChange={(event) => setFormState((prev) => ({ ...prev, policy: event.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="rewards" className="text-sm font-semibold">
                  Rewards
                </label>
                <textarea
                  id="rewards"
                  value={formState.rewards}
                  onChange={(event) => setFormState((prev) => ({ ...prev, rewards: event.target.value }))}
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="scopes" className="text-sm font-semibold">
                  Scope assets (comma separated)
                </label>
                <textarea
                  id="scopes"
                  value={formState.scopes}
                  onChange={(event) => setFormState((prev) => ({ ...prev, scopes: event.target.value }))}
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
              >
                Launch program
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
