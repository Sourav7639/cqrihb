import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { usePrograms } from '../lib/programs';

export default function ProgramsPage() {
  const { programs } = usePrograms();

  return (
    <Layout activeId="programs">
      <Head>
        <title>Security Programs | SecuryHub</title>
      </Head>
      <section id="programs" className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="space-y-4 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-semibold text-brand-200">
            Live Programs
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Choose the program that matches your expertise.</h1>
          <p className="mx-auto max-w-3xl text-lg text-white/70">
            Explore our curated portfolio of public and private bug bounty initiatives and pentests with clearly defined scopes, policies, and reward tiers.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.id}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-black/40 p-8 transition hover:border-brand-400 hover:bg-black/60"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white group-hover:text-brand-200">
                  {program.name}
                </h2>
                <p className="text-sm text-white/60">{program.summary}</p>
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-200">Scope</p>
                  <ul className="mt-2 space-y-1 text-sm text-white/70">
                    {program.scopes.map((scope) => (
                      <li key={scope} className="flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-brand-400" />
                        {scope}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between text-sm">
                <span className="text-white/60">Updated {new Date(program.updatedAt).toLocaleDateString()}</span>
                <Link
                  href={`/program-detail-securyhub?programId=${program.id}`}
                  className="inline-flex items-center gap-2 text-brand-200 transition hover:text-brand-100"
                >
                  View details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
