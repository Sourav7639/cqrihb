import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../../components/Layout';

export default function LoginPage() {
  return (
    <Layout>
      <Head>
        <title>Login | SecuryHub</title>
      </Head>
      <section id="login" className="mx-auto w-full max-w-4xl px-6 py-20">
        <div className="space-y-6 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            Login
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Access your SecuryHub account.</h1>
          <p className="text-lg text-white/70">Select the experience tailored to your role.</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <Link
            href="/login/researcher"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Researcher</h2>
            <p className="mt-3 text-sm text-white/70">Submit reports and track rewards.</p>
          </Link>
          <Link
            href="/login/organization"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Organization</h2>
            <p className="mt-3 text-sm text-white/70">Manage programs and triage findings.</p>
          </Link>
          <Link
            href="/login/admin"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Admin</h2>
            <p className="mt-3 text-sm text-white/70">View platform-level metrics.</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
