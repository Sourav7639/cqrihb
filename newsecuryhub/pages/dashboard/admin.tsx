import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { useDemoStore } from '../../store/demoStore';

export default function AdminDashboardPage() {
  const { auth, programs, submissions } = useDemoStore();

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard | SecuryHub</title>
      </Head>
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-white/70">
            {auth.user?.role === 'admin'
              ? 'Monitor platform activity, user counts, and submission pipeline.'
              : 'Sign in as an admin to access analytics.'}
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Programs</p>
            <p className="mt-3 text-4xl font-bold text-brand-200">{programs.length}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Submissions</p>
            <p className="mt-3 text-4xl font-bold text-brand-200">{submissions.length}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Rewards Paid</p>
            <p className="mt-3 text-4xl font-bold text-brand-200">
              ${submissions.reduce((total, submission) => total + (submission.reward || 0), 0).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Recent activity</h2>
          <div className="space-y-3">
            {submissions.slice(-5).reverse().map((submission) => (
              <div key={submission.id} className="rounded-2xl border border-white/10 bg-black/30 px-6 py-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-white">{submission.title}</p>
                    <p className="text-xs text-white/50">{submission.status.toUpperCase()}</p>
                  </div>
                  <p className="text-xs text-white/50">
                    Updated {new Date(submission.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            {submissions.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-4 text-center text-white/60">
                Awaiting submissions.
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
