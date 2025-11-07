import Head from 'next/head';
import { Layout } from '../components/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | SecuryHub</title>
      </Head>
      <section id="privacy" className="mx-auto w-full max-w-4xl px-6 py-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-white/70">
            SecuryHub respects the privacy of researchers, organizations, and administrators who rely on our platform. This policy outlines how we collect, use, and protect information across demo and production deployments.
          </p>
          <div className="space-y-4 text-white/70">
            <section>
              <h2 className="text-2xl font-semibold text-white">Data we collect</h2>
              <p className="mt-2">
                We collect account metadata (name, email, role), program definitions, vulnerability submissions, and audit activity logs to provide platform functionality.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">How we use data</h2>
              <p className="mt-2">
                Information powers collaboration features, analytics, and compliance logging. We never sell personal data and restrict access based on role and least privilege principles.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Security controls</h2>
              <p className="mt-2">
                Production mode leverages Supabase Auth and Storage with encryption at rest, signed URLs, and audit trails. Demo mode stores only local data within the user’s browser.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Your rights</h2>
              <p className="mt-2">
                Contact us to request data exports or deletion. We adhere to applicable privacy regulations and review this policy regularly.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
