import { useState } from 'react';

const links = [
  { label: 'Overview', href: '#overview' },
  { label: 'New Expense', href: '#new-expense' },
  { label: 'Recent', href: '#recent-expenses' },
  { label: 'Insights', href: '#insights' }
];

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-600 to-sky-500 text-white shadow-xl shadow-slate-400/10">
            <span className="text-lg font-semibold">FT</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">FinTrack</p>
            <p className="text-xs text-slate-500">Finance Tracker</p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          <span className="mr-2">Menu</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#new-expense"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
          >
            Add Expense
          </a>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 px-4 py-4 shadow-sm shadow-slate-200/30">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-3xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#new-expense"
              className="rounded-3xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              onClick={() => setOpen(false)}
            >
              Add Expense
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
