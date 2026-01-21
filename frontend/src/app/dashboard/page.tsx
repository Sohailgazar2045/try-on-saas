'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authAPI } from '@/lib/api';
import { Sidebar } from '@/components/Sidebar';
import { 
  Sparkles, 
  Image as ImageIcon, 
  TrendingUp,
  Zap,
  CheckCircle2,
  ArrowRight
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
      <Sidebar user={user} />

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

              {/* Recent Activity */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <h2 className="mb-4 text-sm font-semibold text-slate-200">Recent Activity</h2>
                <div className="space-y-3">
                  {recentActivity.slice(0, 3).map((activity, idx) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

