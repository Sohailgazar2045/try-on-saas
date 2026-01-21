'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { billingAPI, authAPI } from '@/lib/api';
import { CreditCounter } from '@/components/CreditCounter';
import { Check, LayoutDashboard, Sparkles, Image as ImageIcon, CreditCard, User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <BillingContent />
    </ProtectedRoute>
  );
}

function BillingContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [pricing, setPricing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', active: pathname === '/dashboard' },
    { href: '/try-on', icon: Sparkles, label: 'Try-On', active: pathname === '/try-on' },
    { href: '/gallery', icon: ImageIcon, label: 'Gallery', active: pathname === '/gallery' },
    { href: '/billing', icon: CreditCard, label: 'Billing', active: pathname === '/billing' },
    { href: '/profile', icon: User, label: 'Profile', active: pathname === '/profile' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, pricingRes] = await Promise.all([
        authAPI.getProfile(),
        billingAPI.getPricing(),
      ]);
      setUser(userRes.data.user);
      setPricing(pricingRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (plan: string, type: 'credits' | 'subscription') => {
    try {
      const response = await billingAPI.createCheckout({ plan, type });
      // Redirect to Stripe Checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-950/95 backdrop-blur">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-4">
            <span className="h-8 w-8 shrink-0 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40" />
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              Virtual Try-On
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-primary-500/10 text-primary-300'
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-slate-800/80 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary-400 to-sky-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-200">
                  {user?.name || user?.email || 'User'}
                </p>
                <p className="truncate text-[10px] text-slate-500">
                  {user?.email || 'demo@tryon.dev'}
                </p>
              </div>
            </div>
            <CreditCounter credits={user?.credits || 0} />
            <button
              onClick={async () => {
                await authAPI.logout();
                router.push('/');
              }}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-900/50 hover:text-slate-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold text-slate-100">Billing & usage</h1>
              <p className="text-xs text-slate-500">
                Top up credits or move to a subscription as your experiments scale.
              </p>
            </div>
          </div>
        </header>

        <div className="px-6 py-6">
        {/* Credit Packages */}
        <div className="mb-10">
          <h2 className="mb-4 text-sm font-semibold text-slate-100">Credit packages</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pricing?.creditPackages && Object.entries(pricing.creditPackages).map(([key, pkg]: [string, any]) => (
              <div key={key} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
                <h3 className="text-sm font-semibold capitalize text-slate-100">{key} package</h3>
                <p className="mt-3 text-3xl font-semibold text-primary-300 mb-2">
                  ${pkg.price}
                </p>
                <p className="text-xs text-slate-400 mb-4">{pkg.credits} credits</p>
                <button
                  onClick={() => handleCheckout(key, 'credits')}
                  disabled={loading}
                  className="w-full rounded-lg bg-primary-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Preparing checkout…' : 'Purchase credits'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div>
          <h2 className="mb-4 text-sm font-semibold text-slate-100">Subscription plans</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pricing?.subscriptions && Object.entries(pricing.subscriptions).map(([key, plan]: [string, any]) => (
              <div
                key={key}
                className={`rounded-2xl border p-6 shadow-sm ${
                  key === 'PREMIUM'
                    ? 'border-primary-500/70 bg-slate-900/80 shadow-primary-500/20'
                    : 'border-slate-800 bg-slate-900/70'
                }`}
              >
                {key === 'PREMIUM' && (
                  <div className="mb-3 inline-flex rounded-full bg-primary-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-sm font-semibold text-slate-100">{plan.name}</h3>
                <p className="mt-3 text-3xl font-semibold text-primary-300 mb-2">
                  ${plan.price}
                  {plan.price > 0 && <span className="text-xs text-slate-400">/month</span>}
                </p>
                <ul className="mb-6 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>{plan.credits} credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Unlimited generations</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleCheckout(key.toLowerCase(), 'subscription')}
                  disabled={loading}
                  className={`w-full rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    key === 'PREMIUM'
                      ? 'bg-primary-500 text-white hover:bg-primary-400'
                      : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                  }`}
                >
                  {plan.price === 0 ? 'Current plan' : loading ? 'Preparing checkout…' : 'Subscribe'}
                </button>
              </div>
            ))}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

