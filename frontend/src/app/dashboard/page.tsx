'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authAPI } from '@/lib/api';
import { CreditCounter } from '@/components/CreditCounter';
import { 
  Sparkles, 
  Image as ImageIcon, 
  BarChart3, 
  Clock, 
  ListChecks, 
  HelpCircle,
  LayoutDashboard,
  CreditCard,
  User,
  LogOut,
  TrendingUp,
  Zap,
  CheckCircle2,
  ArrowRight,
  Settings,
  FileText
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load profile in dashboard (demo mode):', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', active: pathname === '/dashboard' },
    { href: '/try-on', icon: Sparkles, label: 'Try-On', active: pathname === '/try-on' },
    { href: '/gallery', icon: ImageIcon, label: 'Gallery', active: pathname === '/gallery' },
    { href: '/billing', icon: CreditCard, label: 'Billing', active: pathname === '/billing' },
    { href: '/profile', icon: User, label: 'Profile', active: pathname === '/profile' },
  ];

  const stats = [
    { label: 'Total Try-Ons', value: '142', change: '+12%', trend: 'up', icon: Sparkles },
    { label: 'Gallery Items', value: '89', change: '+8%', trend: 'up', icon: ImageIcon },
    { label: 'Credits Used', value: '53', change: 'This month', trend: 'neutral', icon: Zap },
    { label: 'Success Rate', value: '98%', change: '+2%', trend: 'up', icon: TrendingUp },
  ];

  const recentActivity = [
    { action: 'Generated try-on', item: 'Summer Collection - Dress', time: '2 hours ago', type: 'success' },
    { action: 'Saved to gallery', item: '3 images', time: '5 hours ago', type: 'info' },
    { action: 'Updated profile', item: 'Account settings', time: '1 day ago', type: 'info' },
    { action: 'Viewed billing', item: 'Pricing plans', time: '2 days ago', type: 'info' },
  ];

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

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold text-slate-100">
                {loading ? 'Loading...' : `Welcome back, ${user?.name?.split(' ')[0] || 'there'}`}
              </h1>
              <p className="text-xs text-slate-500">Here's what's happening with your workspace</p>
            </div>
            <div className="flex items-center gap-3" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold text-slate-100">{stat.value}</p>
                      <p className={`mt-1 text-xs ${
                        stat.trend === 'up' ? 'text-emerald-400' : 
                        stat.trend === 'down' ? 'text-red-400' : 
                        'text-slate-500'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary-500/10 p-3">
                      <Icon className="h-5 w-5 text-primary-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <h2 className="mb-4 text-sm font-semibold text-slate-200">Quick Actions</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/try-on"
                    className="group flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/30 p-4 transition hover:border-primary-500/50 hover:bg-slate-900/50"
                  >
                    <div className="rounded-lg bg-primary-500/10 p-2.5 group-hover:bg-primary-500/20">
                      <Sparkles className="h-5 w-5 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-slate-100">Create Try-On</h3>
                      <p className="mt-0.5 text-xs text-slate-500">Generate new visuals</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-400" />
                  </Link>
                  <Link
                    href="/gallery"
                    className="group flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/30 p-4 transition hover:border-sky-500/50 hover:bg-slate-900/50"
                  >
                    <div className="rounded-lg bg-sky-500/10 p-2.5 group-hover:bg-sky-500/20">
                      <ImageIcon className="h-5 w-5 text-sky-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-slate-100">View Gallery</h3>
                      <p className="mt-0.5 text-xs text-slate-500">Browse your images</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-400" />
                  </Link>
                </div>
              </div>

              {/* Usage Chart */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-200">Usage Overview</h2>
                    <p className="mt-1 text-xs text-slate-500">Last 7 days</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                    +26% vs last week
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Try-Ons Generated</span>
                      <span className="font-medium text-slate-200">18</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-[72%] bg-gradient-to-r from-primary-500 to-sky-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Credits Used</span>
                      <span className="font-medium text-slate-200">53 / 100</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-[53%] bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Gallery Items</span>
                      <span className="font-medium text-slate-200">89</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-[45%] bg-gradient-to-r from-purple-500 to-pink-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <h2 className="mb-4 text-sm font-semibold text-slate-200">Recent Activity</h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-1.5 ${
                        activity.type === 'success' ? 'bg-emerald-500/10' : 'bg-sky-500/10'
                      }`}>
                        <CheckCircle2 className={`h-3.5 w-3.5 ${
                          activity.type === 'success' ? 'text-emerald-400' : 'text-sky-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-200">
                          {activity.action}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {activity.item}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-600">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Account Summary */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <h2 className="mb-4 text-sm font-semibold text-slate-200">Account Summary</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500">Credits Remaining</p>
                    <p className="mt-1 text-2xl font-bold text-primary-400">
                      {user?.credits || 0}
                    </p>
                    <Link
                      href="/billing"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300"
                    >
                      Top up credits <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="border-t border-slate-800 pt-4">
                    <p className="text-xs text-slate-500">Current Plan</p>
                    <p className="mt-1 text-lg font-semibold text-slate-200">
                      {user?.subscription || 'Free'}
                    </p>
                    <Link
                      href="/billing"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300"
                    >
                      Upgrade plan <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="border-t border-slate-800 pt-4">
                    <p className="text-xs text-slate-500">Member Since</p>
                    <p className="mt-1 text-sm font-medium text-slate-200">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Getting Started */}
              <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-primary-500/5 to-sky-500/5 p-6 backdrop-blur">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-lg bg-primary-500/10 p-2">
                    <ListChecks className="h-4 w-4 text-primary-400" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-200">Getting Started</h2>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>Upload your first model photo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>Add garment images to try-on</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-slate-600" />
                    <span>Generate your first try-on</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-slate-600" />
                    <span>Save results to gallery</span>
                  </li>
                </ul>
                <Link
                  href="/try-on"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-400"
                >
                  Start Creating <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Help & Resources */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-lg bg-sky-500/10 p-2">
                    <HelpCircle className="h-4 w-4 text-sky-400" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-200">Need Help?</h2>
                </div>
                <p className="text-xs text-slate-400">
                  This is a demo environment. Explore all features without a backend connection.
                </p>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/try-on"
                    className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-900/50"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Try-On Guide</span>
                  </Link>
                  <Link
                    href="/gallery"
                    className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-900/50"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Gallery Tips</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

