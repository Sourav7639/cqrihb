import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useDemoStore } from '../../store/demoStore';

export default function LoginResearcherPage() {
  const { login } = useDemoStore();
  const [email, setEmail] = useState('researcher@demo.securyhub');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password);
      setMessage('Logged in as researcher (demo mode).');
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Researcher Login | SecuryHub</title>
      </Head>
      <section id="login-researcher" className="mx-auto w-full max-w-md px-6 py-20">
        <div className="space-y-6 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
            Researcher
          </p>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-sm text-white/70">Sign in to manage your submissions and rewards.</p>
        </div>
        <form className="mt-10 space-y-5 rounded-3xl border border-white/10 bg-black/40 p-8" onSubmit={handleSubmit}>
          {message && <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">{message}</div>}
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
            />
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
          >
            Login
          </button>
        </form>
      </section>
    </Layout>
  );
}
