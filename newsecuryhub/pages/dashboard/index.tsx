import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../../components/Layout';
import { useDemoStore } from '../../store/demoStore';

export default function DashboardIndexPage() {
  const { auth } = useDemoStore();

  return (
    <Layout>
      <Head>
        <title>Dashboard | SecuryHub</title>
      </Head>
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <div className="space-y-6 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            Dashboard
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Your operational cockpit.</h1>
          <p className="text-lg text-white/70">
            {auth.user ? `Signed in as ${auth.user.name} (${auth.user.role}).` : 'Sign in to access personalized dashboards.'}
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <Link
            href="/dashboard/researcher"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Researcher</h2>
            <p className="mt-3 text-sm text-white/70">Track your submissions and rewards.</p>
          </Link>
          <Link
            href="/dashboard/organization"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Organization</h2>
            <p className="mt-3 text-sm text-white/70">Create programs and triage incoming reports.</p>
          </Link>
          <Link
            href="/dashboard/admin"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Admin</h2>
            <p className="mt-3 text-sm text-white/70">Review platform analytics and audit trails.</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
