import Link from 'next/link';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Home', id: 'home' },
  { href: '/bug-bounty', label: 'Bug Bounty', id: 'bug-bounty' },
  { href: '/programs', label: 'Programs', id: 'programs' },
  { href: '/pentest', label: 'Pentest', id: 'pentest' },
  { href: '/about', label: 'About', id: 'about' },
  { href: '/contact', label: 'Contact', id: 'contact' }
];

export function Layout({ children, activeId }: { children: ReactNode; activeId?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-lg font-bold">SH</span>
            <span>SecuryHub</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={clsx('transition-colors hover:text-brand-300', {
                  'text-brand-300': activeId === item.id
                })}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden rounded-full border border-white/20 px-5 py-2 text-sm font-semibold transition hover:border-brand-400 hover:text-brand-200 md:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="hidden rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-400 md:inline-flex"
            >
              Sign Up
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={clsx('border-t border-white/10 bg-black/70 backdrop-blur md:hidden', {
            hidden: !menuOpen
          })}
        >
          <div className="space-y-1 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={clsx('block rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/5', {
                  'bg-white/10 text-brand-200': activeId === item.id
                })}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="block rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-white/5"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-200 transition hover:bg-white/5"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <main className="pt-24">{children}</main>
      <footer className="border-t border-white/10 bg-black/60">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SecuryHub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
