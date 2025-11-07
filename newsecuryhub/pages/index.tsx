import Head from 'next/head';
import { Layout } from '../components/Layout';
import { DemoBadge } from '../components/DemoBadge';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout activeId="home">
      <Head>
        <title>SecuryHub | Bug Bounty & Pentesting Platform</title>
        <meta
          name="description"
          content="SecuryHub centralizes bug bounty, pentesting, and responsible disclosure in one platform for security researchers and organizations."
        />
      </Head>
      <section id="home" className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-16 lg:flex-row lg:items-center">
        <div className="space-y-6 lg:w-1/2">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-semibold text-brand-200">
            Secure the future with confidence
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Bug bounty & pentest operations designed for elite teams.
          </h1>
          <p className="text-lg text-white/70">
            Launch programs in minutes, collaborate with world-class researchers, and turn reports into measurable improvements without sacrificing UX.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
            >
              Explore Programs
            </Link>
            <Link
              href="/submit-bug"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-brand-400 hover:text-brand-200"
            >
              Submit a Bug
            </Link>
          </div>
        </div>
        <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/40 via-transparent to-black/60 p-6">
            <h3 className="text-lg font-semibold">For Researchers</h3>
            <p className="mt-2 text-sm text-white/70">
              Access curated bounty programs, submit detailed reports, and track rewards with real-time status updates.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/40 via-transparent to-black/60 p-6">
            <h3 className="text-lg font-semibold">For Organizations</h3>
            <p className="mt-2 text-sm text-white/70">
              Launch programs, manage triage workflows, collaborate securely, and respond with confidence.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/40 via-transparent to-black/60 p-6 sm:col-span-2">
            <h3 className="text-lg font-semibold">Trusted Security Operations</h3>
            <p className="mt-2 text-sm text-white/70">
              Unified dashboards, analytics, and compliance-ready workflows to align teams and stakeholders.
            </p>
          </div>
        </div>
      </section>
      <section className="border-t border-white/5 bg-black/40 py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">Platform Highlights</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Purpose-built infrastructure for modern security programs.</h2>
            <p className="text-white/70">
              Coordinate end-to-end bounty, pentest, and disclosure operations with automated workflows, researcher trust profiles, and integrated compliance reporting.
            </p>
            <ul className="space-y-4 text-white/70">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-brand-200">✓</span>
                Streamlined program creation & triage tooling.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-brand-200">✓</span>
                Secure researcher collaboration with contextual insights.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-brand-200">✓</span>
                Real-time analytics and executive-ready reporting.
              </li>
            </ul>
          </div>
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-10">
            <div>
              <h3 className="text-xl font-semibold">Security-first architecture</h3>
              <p className="mt-2 text-sm text-white/70">
                Built on zero-trust principles with granular access controls, encrypted storage, and end-to-end auditability.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Automated workflows</h3>
              <p className="mt-2 text-sm text-white/70">
                Role-based automations orchestrate notifications, reward approvals, and compliance-ready transcripts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Hybrid mode ready</h3>
              <p className="mt-2 text-sm text-white/70">
                Switch between demo sandbox and production Supabase integration without code changes.
              </p>
            </div>
          </div>
        </div>
      </section>
      <DemoBadge />
    </Layout>
  );
}
