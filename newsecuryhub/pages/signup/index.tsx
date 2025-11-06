import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../../components/Layout';

export default function SignupPage() {
  return (
    <Layout>
      <Head>
        <title>Sign Up | SecuryHub</title>
      </Head>
      <section id="signup" className="mx-auto w-full max-w-4xl px-6 py-20">
        <div className="space-y-6 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            Sign Up
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Choose how you want to join SecuryHub.</h1>
          <p className="text-lg text-white/70">Select the onboarding path aligned to your role.</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <Link
            href="/signup/researcher"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Researcher</h2>
            <p className="mt-3 text-sm text-white/70">Join elite bounty programs and pentests.</p>
          </Link>
          <Link
            href="/signup/organization"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Organization</h2>
            <p className="mt-3 text-sm text-white/70">Launch programs, manage submissions, and reward talent.</p>
          </Link>
          <Link
            href="/signup/admin"
            className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center transition hover:border-brand-400 hover:bg-black/60"
          >
            <h2 className="text-xl font-semibold">Admin</h2>
            <p className="mt-3 text-sm text-white/70">Coordinate platform configuration and analytics.</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
