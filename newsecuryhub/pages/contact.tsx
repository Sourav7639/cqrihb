import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { Layout } from '../components/Layout';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (process.env.NEXT_PUBLIC_HOSTING === 'netlify') return;

    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout activeId="contact">
      <Head>
        <title>Contact SecuryHub</title>
      </Head>
      <section id="contact" className="mx-auto w-full max-w-5xl px-6 py-20">
        {submitted ? (
          <div className="rounded-3xl border border-white/10 bg-brand-500/10 p-10 text-center text-white">
            <h1 className="text-3xl font-bold">Thank you for reaching out!</h1>
            <p className="mt-4 text-white/70">We received your message and will get back to you shortly.</p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="space-y-3 text-center">
              <p className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
                Contact
              </p>
              <h1 className="text-4xl font-bold sm:text-5xl">Let&apos;s discuss your security goals.</h1>
              <p className="text-lg text-white/70">
                Share your requirements or questions and our team will orchestrate the next steps for your bug bounty or pentest program.
              </p>
            </div>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-10"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="hidden">
                <label>
                  Don’t fill this out if you’re human: <input name="bot-field" />
                </label>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
              >
                Send message
              </button>
            </form>
          </div>
        )}
      </section>
    </Layout>
  );
}
