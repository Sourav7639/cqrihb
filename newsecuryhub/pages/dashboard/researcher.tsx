import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { useDemoStore } from '../../store/demoStore';

export default function ResearcherDashboardPage() {
  const { submissions, auth } = useDemoStore();
  const researcherId = auth.user?.role === 'researcher' ? auth.user.id : null;
  const filtered = researcherId
    ? submissions.filter((submission) => submission.researcherUserId === researcherId)
    : [];

  return (
    <Layout>
      <Head>
        <title>Researcher Dashboard | SecuryHub</title>
      </Head>
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Researcher Dashboard</h1>
          <p className="text-white/70">
            {researcherId
              ? 'Review the status of your vulnerability submissions and rewards.'
              : 'Sign in as a researcher to view your submissions.'}
          </p>
        </div>
        <div className="mt-12 space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center text-white/60">
              No submissions yet.
            </div>
          ) : (
            filtered.map((submission) => (
              <article key={submission.id} className="rounded-3xl border border-white/10 bg-black/40 p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{submission.title}</h2>
                    <p className="text-sm text-white/60">Severity: {submission.severity.toUpperCase()}</p>
                  </div>
                  <div className="text-sm font-semibold text-brand-200 uppercase">
                    {submission.status.replace('-', ' ')}
                  </div>
                </div>
                <div className="mt-6 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">Impact</p>
                    <p className="mt-2 whitespace-pre-line">{submission.impact}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">Steps</p>
                    <p className="mt-2 whitespace-pre-line">{submission.steps}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">References</p>
                    <p className="mt-2 whitespace-pre-line">{submission.references}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">Reward</p>
                    <p className="mt-2">
                      {submission.reward ? `$${submission.reward.toLocaleString()}` : 'Pending'}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}
