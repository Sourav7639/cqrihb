import Head from 'next/head';
import { Layout } from '../components/Layout';
import { Tabs } from '../components/Tabs';

export default function BugBountyPage() {
  return (
    <Layout activeId="bug-bounty">
      <Head>
        <title>Bug Bounty Programs | SecuryHub</title>
      </Head>
      <section id="bug-bounty" className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="space-y-6 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-semibold text-brand-200">
            Bug Bounty HQ
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Operational excellence for every vulnerability disclosure.</h1>
          <p className="mx-auto max-w-3xl text-lg text-white/70">
            Manage submission flows, automate triage, and collaborate securely with the global researcher community. SecuryHub centralizes your program lifecycle from policy design to payout.
          </p>
        </div>
        <div className="mt-16 space-y-12">
          <Tabs
            items={[
              {
                id: 'workflow',
                label: 'Workflow',
                content: (
                  <div className="space-y-6">
                    <p className="text-white/70">
                      Configure multi-stage workflows with status automation, SLA tracking, and secure messaging channels for researchers and internal responders.
                    </p>
                    <ul className="grid gap-4 text-left text-white/70 sm:grid-cols-2">
                      <li className="rounded-2xl border border-white/10 bg-black/40 p-5">
                        <h3 className="text-lg font-semibold text-white">Adaptive triage</h3>
                        <p className="mt-2 text-sm">
                          Route submissions based on severity and asset scope, with audit-ready decision trails for each escalation.
                        </p>
                      </li>
                      <li className="rounded-2xl border border-white/10 bg-black/40 p-5">
                        <h3 className="text-lg font-semibold text-white">Reward orchestration</h3>
                        <p className="mt-2 text-sm">
                          Align finance approvals and automate bounty payouts once submissions are resolved and validated.
                        </p>
                      </li>
                    </ul>
                  </div>
                )
              },
              {
                id: 'researchers',
                label: 'Researchers',
                content: (
                  <div className="space-y-6">
                    <p className="text-white/70">
                      Curate trusted researchers, set invite-only cohorts, and track performance metrics including accuracy, impact, and collaboration history.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                        <h3 className="text-lg font-semibold">Signal-based ranking</h3>
                        <p className="mt-2 text-sm text-white/70">
                          Weighted scoring surfaces high-impact researchers while keeping the community accessible.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                        <h3 className="text-lg font-semibold">Security posture insights</h3>
                        <p className="mt-2 text-sm text-white/70">
                          Enriched profiles highlight certifications, history, and reliability.
                        </p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                id: 'analytics',
                label: 'Analytics',
                content: (
                  <div className="space-y-6">
                    <p className="text-white/70">
                      Real-time metrics track submission volume, triage velocity, and payout distribution to inform leadership.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
                        <p className="text-3xl font-bold text-brand-200">98%</p>
                        <p className="mt-2 text-sm text-white/70">SLA compliance on average triage windows.</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
                        <p className="text-3xl font-bold text-brand-200">72h</p>
                        <p className="mt-2 text-sm text-white/70">Median time from submission to triage decision.</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
                        <p className="text-3xl font-bold text-brand-200">$8.2k</p>
                        <p className="mt-2 text-sm text-white/70">Average bounty for accepted critical reports.</p>
                      </div>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}
