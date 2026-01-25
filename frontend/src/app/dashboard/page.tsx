'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authAPI } from '@/lib/api';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Sparkles, 
  Image as ImageIcon, 
  TrendingUp,
  Zap,
  CheckCircle2,
  ArrowRight,
  Activity
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
    <div className="flex h-screen bg-slate-950 text-slate-50">
      <Sidebar user={user} />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header 
          user={user} 
          title={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}!`}
          subtitle="Here's what's happening with your workspace"
        />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-6">
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group card-interactive"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{stat.label}</p>
                        <p className="mt-3 text-3xl font-bold text-slate-100 transition-all duration-300 group-hover:text-primary-400">{stat.value}</p>
                        <p className={`mt-2 text-xs font-medium ${
                          stat.trend === 'up' ? 'text-emerald-400' : 
                          stat.trend === 'down' ? 'text-red-400' : 
                          'text-slate-500'
                        }`}>
                          {stat.change}
                        </p>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/5 ring-1 ring-primary-500/20 transition-all duration-300 group-hover:ring-primary-500/40">
                        <Icon className="h-7 w-7 text-primary-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Grid - Left and Right Columns */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <div className="card-elevated">
                  <h2 className="text-base font-bold text-slate-100 mb-5">Quick Actions</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Link
                      href="/try-on"
                      className="group relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950/70 p-4 transition-all duration-300 hover:border-primary-500/50 hover:bg-slate-900/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-500/10 ring-1 ring-primary-500/30 transition-all duration-300 group-hover:ring-primary-500/50">
                          <Sparkles className="h-6 w-6 text-primary-400 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-slate-100 transition-colors duration-300 group-hover:text-primary-300">Create Try-On</h3>
                          <p className="mt-1 text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-400">Generate new visuals</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                    <Link
                      href="/gallery"
                      className="group relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950/70 p-4 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-sky-500/10 ring-1 ring-sky-500/30 transition-all duration-300 group-hover:ring-sky-500/50">
                          <ImageIcon className="h-6 w-6 text-sky-400 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-slate-100 transition-colors duration-300 group-hover:text-sky-300">View Gallery</h3>
                          <p className="mt-1 text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-400">Browse your images</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/0 via-sky-500/0 to-sky-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card-elevated">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary-400" />
                      Recent Activity
                    </h2>
                    <Link href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">View all</Link>
                  </div>
                  <div className="space-y-4">
                    {recentActivity.slice(0, 3).map((activity, idx) => (
                      <div key={idx} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors duration-300">
                        <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                          activity.type === 'success' ? 'bg-emerald-500/10' : 'bg-primary-500/10'
                        } ring-1 ${activity.type === 'success' ? 'ring-emerald-500/30' : 'ring-primary-500/30'}`}>
                          <CheckCircle2 className={`h-4 w-4 ${
                            activity.type === 'success' ? 'text-emerald-400' : 'text-primary-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-200 transition-colors duration-300 group-hover:text-slate-100">
                            {activity.action}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {activity.item}
                          </p>
                          <p className="mt-1.5 text-[10px] text-slate-600">
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
                <div className="glass-panel-premium p-6">
                  <h2 className="text-base font-bold text-slate-100 mb-5">Account Summary</h2>
                  <div className="space-y-5">
                    <div className="relative p-4 rounded-lg bg-gradient-to-br from-primary-500/10 to-primary-500/5 border border-primary-500/20">
                      <p className="text-xs font-medium uppercase tracking-wider text-primary-400">Credits Remaining</p>
                      <p className="mt-2 text-3xl font-bold text-primary-300">
                        {user?.credits || 0}
                      </p>
                      <Link
                        href="/billing"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        Top up credits <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    <div className="border-t border-slate-800 pt-5">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Current Plan</p>
                      <p className="mt-2 text-xl font-bold text-slate-200">
                        {user?.subscription || 'Free'}
                      </p>
                      <Link
                        href="/billing"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
                      >
                        Upgrade plan <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
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

