import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-200">404</p>
      <h1 className="mt-6 text-4xl font-bold">Page not found</h1>
      <p className="mt-4 max-w-xl text-sm text-white/60">
        The page you are looking for may have been moved. Return to the homepage to continue exploring SecuryHub.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
      >
        Back to home
      </Link>
    </div>
  );
}
