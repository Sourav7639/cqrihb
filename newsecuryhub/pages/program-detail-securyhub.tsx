import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { Tabs } from '../components/Tabs';
import { usePrograms } from '../lib/programs';
import { useDemoStore } from '../store/demoStore';
import { useMode } from '../store/modeStore';
import { Severity } from '../types';

const severities: Severity[] = ['low', 'medium', 'high', 'critical'];

export default function ProgramDetailPage() {
  const router = useRouter();
  const { programId } = router.query;
  const programKey = Array.isArray(programId) ? programId[0] : programId;
  const { programs, isLoading } = usePrograms();
  const program = useMemo(() => programs.find((item) => item.id === programKey), [programKey, programs]);
  const { submitReport, auth } = useDemoStore();
  const { mode } = useMode();
  const [formState, setFormState] = useState({
    title: '',
    severity: 'medium' as Severity,
    impact: '',
    steps: '',
    references: ''
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Layout>
        <section className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="text-3xl font-semibold">Loading program...</h1>
        </section>
      </Layout>
    );
  }

  if (!program) {
    return (
      <Layout>
        <section className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="text-3xl font-semibold">Program not found</h1>
          <p className="mt-4 text-white/70">Please return to the programs list and select a program.</p>
        </section>
      </Layout>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === 'production') {
      setFeedback('Please sign in with your researcher account to submit via Supabase.');
      return;
    }

    if (!auth.user) {
      setFeedback('Please log in as a researcher to submit.');
      return;
    }

    try {
      await submitReport({
        programId: program.id,
        researcherUserId: auth.user.id,
        title: formState.title,
        severity: formState.severity,
        impact: formState.impact,
        steps: formState.steps,
        references: formState.references
      });
      setFeedback('Submission recorded in demo mode.');
      setFormState({ title: '', severity: 'medium', impact: '', steps: '', references: '' });
    } catch (error) {
      setFeedback((error as Error).message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>{program.name} | Program Detail</title>
      </Head>
      <section id="program-detail-securyhub" className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-200">
                Program Detail
              </p>
              <h1 className="text-4xl font-bold sm:text-5xl">{program.name}</h1>
              <p className="text-lg text-white/70">{program.summary}</p>
            </div>
            <Tabs
              items={[
                {
                  id: 'policy',
                  label: 'Policy',
                  content: <p className="text-white/70 whitespace-pre-line">{program.policy}</p>
                },
                {
                  id: 'scope',
                  label: 'Scope',
                  content: (
                    <ul className="space-y-3 text-white/70">
                      {program.scopes.map((scope) => (
                        <li key={scope} className="flex items-center gap-3">
                          <span className="inline-flex h-2 w-2 rounded-full bg-brand-400" />
                          {scope}
                        </li>
                      ))}
                    </ul>
                  )
                },
                {
                  id: 'rewards',
                  label: 'Rewards',
                  content: <p className="text-white/70 whitespace-pre-line">{program.rewards}</p>
                }
              ]}
            />
          </div>
          <div className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-8">
            <h2 className="text-2xl font-semibold">Submit a vulnerability</h2>
            <p className="text-sm text-white/60">
              Provide reproducible steps, impact analysis, and supporting references. Attachments can be added in production mode via Supabase storage.
            </p>
            {feedback && <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">{feedback}</div>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-semibold">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  value={formState.title}
                  onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="severity" className="text-sm font-semibold">
                  Severity
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={formState.severity}
                  onChange={(event) => setFormState((prev) => ({ ...prev, severity: event.target.value as Severity }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                >
                  {severities.map((option) => (
                    <option key={option} value={option} className="bg-gray-900 text-white">
                      {option.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="impact" className="text-sm font-semibold">
                  Impact
                </label>
                <textarea
                  id="impact"
                  name="impact"
                  required
                  rows={3}
                  value={formState.impact}
                  onChange={(event) => setFormState((prev) => ({ ...prev, impact: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="steps" className="text-sm font-semibold">
                  Steps to reproduce
                </label>
                <textarea
                  id="steps"
                  name="steps"
                  required
                  rows={4}
                  value={formState.steps}
                  onChange={(event) => setFormState((prev) => ({ ...prev, steps: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="references" className="text-sm font-semibold">
                  References & attachments
                </label>
                <textarea
                  id="references"
                  name="references"
                  rows={3}
                  value={formState.references}
                  onChange={(event) => setFormState((prev) => ({ ...prev, references: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                  placeholder="Links to proofs, assets, or reproduction media."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
              >
                Submit report
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
