import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { Layout } from '../components/Layout';
import { useDemoStore } from '../store/demoStore';
import { usePrograms } from '../lib/programs';
import { Severity } from '../types';

const severities: Severity[] = ['low', 'medium', 'high', 'critical'];

export default function SubmitBugPage() {
  const { programs, isLoading } = usePrograms();
  const { submitReport, auth } = useDemoStore();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    programId: '',
    title: '',
    severity: 'medium' as Severity,
    impact: '',
    steps: '',
    references: ''
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth.user) {
      setFeedback('Please log in as a researcher to submit.');
      return;
    }

    try {
      await submitReport({
        programId: formState.programId,
        researcherUserId: auth.user.id,
        title: formState.title,
        severity: formState.severity,
        impact: formState.impact,
        steps: formState.steps,
        references: formState.references
      });
      setFeedback('Bug submission saved in demo mode.');
      setFormState({ programId: '', title: '', severity: 'medium', impact: '', steps: '', references: '' });
    } catch (error) {
      setFeedback((error as Error).message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Submit a Bug | SecuryHub</title>
      </Head>
      <section id="submit-bug" className="mx-auto w-full max-w-4xl px-6 py-20">
        <div className="space-y-6 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            Submit Bug
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Share your findings securely.</h1>
          <p className="text-lg text-white/70">
            Provide detailed reproduction steps, proof of concept, and references to ensure rapid triage and resolution.
          </p>
        </div>
        <div className="mt-16 space-y-6 rounded-3xl border border-white/10 bg-black/40 p-10">
          {feedback && <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">{feedback}</div>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="programId" className="text-sm font-semibold">
                Select Program
              </label>
              <select
                id="programId"
                name="programId"
                required
                value={formState.programId}
                onChange={(event) => setFormState((prev) => ({ ...prev, programId: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              >
                <option value="" className="bg-gray-900 text-white">
                  Choose a program
                </option>
                {isLoading && (
                  <option value="" disabled className="bg-gray-900 text-white">
                    Loading programs...
                  </option>
                )}
                {programs.map((program) => (
                  <option key={program.id} value={program.id} className="bg-gray-900 text-white">
                    {program.name}
                  </option>
                ))}
              </select>
            </div>
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
                rows={3}
                required
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
                rows={4}
                required
                value={formState.steps}
                onChange={(event) => setFormState((prev) => ({ ...prev, steps: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="references" className="text-sm font-semibold">
                References
              </label>
              <textarea
                id="references"
                name="references"
                rows={3}
                value={formState.references}
                onChange={(event) => setFormState((prev) => ({ ...prev, references: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                placeholder="Links to proof-of-concept, screenshots, or logs"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
            >
              Submit bug
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
