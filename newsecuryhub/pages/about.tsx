import Head from 'next/head';
import { Layout } from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout activeId="about">
      <Head>
        <title>About SecuryHub</title>
      </Head>
      <section id="about" className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            Mission & Values
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">We empower defenders and researchers to partner on security resilience.</h1>
          <p className="max-w-3xl text-lg text-white/70">
            SecuryHub was founded by security engineers and bug bounty veterans who experienced the friction between siloed platforms and manual workflows. Our platform unifies communication, compliance, and analytics so teams can deliver secure products faster.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Global researcher network',
              body: 'Thousands of vetted researchers collaborate responsibly through curated programs and pentest engagements.'
            },
            {
              title: 'Secure collaboration',
              body: 'Granular access controls, encrypted storage, and comprehensive audit logs keep sensitive data protected.'
            },
            {
              title: 'Operational excellence',
              body: 'Automated workflows align security, engineering, finance, and leadership around measurable outcomes.'
            },
            {
              title: 'Responsible disclosure',
              body: 'We champion clear policies, transparent communication, and recognition for the researchers who keep products safe.'
            }
          ].map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-white/70">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
