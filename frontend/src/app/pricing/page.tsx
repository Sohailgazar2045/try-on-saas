import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40" />
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              Virtual Try-On
            </span>
          </Link>
          <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
            <Link href="/login" className="text-slate-300 hover:text-slate-50">
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-400"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-10 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Simple, transparent pricing.
          </h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Start free, then scale credits and seats as your use cases grow.
          </p>
        </div>

        <div className="grid max-w-5xl gap-6 md:grid-cols-3">
          {/* Free Plan */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-100">Free</h3>
            <p className="mt-3 text-3xl font-semibold text-primary-300">$0</p>
            <p className="mt-1 text-xs text-slate-400">For quick experiments and demos.</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>5 free credits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Access to core try-on flows</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="mt-6 block w-full rounded-lg bg-slate-800 px-4 py-2.5 text-center text-xs font-semibold text-slate-100 hover:bg-slate-700"
            >
              Get started
            </Link>
          </div>

          {/* Basic Plan */}
          <div className="relative rounded-2xl border border-primary-500/60 bg-slate-900/80 p-6 shadow-lg shadow-primary-500/20">
            <div className="absolute -top-3 left-4 rounded-full bg-primary-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              Most popular
            </div>
            <h3 className="mt-2 text-sm font-semibold text-slate-100">Basic</h3>
            <p className="mt-3 text-3xl font-semibold text-primary-300">
              $9.99<span className="text-xs text-slate-400">/month</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">For individual creators and lean teams.</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>50 credits per month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Priority processing pipeline</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Email support</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="mt-6 block w-full rounded-lg bg-primary-500 px-4 py-2.5 text-center text-xs font-semibold text-white hover:bg-primary-400"
            >
              Subscribe
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-100">Premium</h3>
            <p className="mt-3 text-3xl font-semibold text-primary-300">
              $29.99<span className="text-xs text-slate-400">/month</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">For teams running ongoing campaigns.</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>200 credits per month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Highest quality rendering pipeline</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Priority support & SLAs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Advanced collaboration features</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="mt-6 block w-full rounded-lg bg-primary-500 px-4 py-2.5 text-center text-xs font-semibold text-white hover:bg-primary-400"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

