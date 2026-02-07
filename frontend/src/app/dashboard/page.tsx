'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authAPI } from '@/lib/api';
import { isDemoMode, getDemoUser } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { 
  Sparkles, 
  Image as ImageIcon, 
  TrendingUp,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Plus
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
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const demo = isDemoMode();
      setIsDemo(demo);

      if (demo) {
        setUser(getDemoUser());
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const stats = [
    { label: 'Try-Ons Created', value: isDemo ? '142' : '0', change: '+12%', trend: 'up', icon: Sparkles, color: 'orange' },
    { label: 'Saved Images', value: isDemo ? '89' : '0', change: '+8%', trend: 'up', icon: ImageIcon, color: 'blue' },
    { label: 'Credits Used', value: isDemo ? '53' : '0', change: 'This month', trend: 'neutral', icon: Zap, color: 'purple' },
    { label: 'Conversion Rate', value: isDemo ? '98%' : '-', change: '+2%', trend: 'up', icon: TrendingUp, color: 'green' },
  ];

  const recentActivity = isDemo ? [
    { action: 'Generated try-on', item: 'Summer Collection - Dress', time: '2 hours ago', status: 'success' },
    { action: 'Saved to gallery', item: '3 new images', time: '5 hours ago', status: 'info' },
    { action: 'Purchased credits', item: '50 credits added', time: '1 day ago', status: 'success' },
  ] : [];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', icon: 'text-orange-400' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: 'text-blue-400' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', icon: 'text-purple-400' },
      green: { bg: 'bg-emerald-500/10', text: 'text-emerald-500 dark:text-emerald-400', icon: 'text-emerald-500 dark:text-emerald-400' },
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="flex h-screen bg-surface">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user} 
          title={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}`}
          subtitle={isDemo ? "Explore how Virtual Try-On works for shoppers and businesses" : "Your personal fashion studio and business dashboard"}
        />

        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const colors = getColorClasses(stat.color);
                return (
                  <div key={stat.label} className="card group">
                    <div className="flex items-start justify-between">
                      <div className={`${colors.bg} rounded-xl p-2.5`}>
                        <Icon className={`h-5 w-5 ${colors.icon}`} />
                      </div>
                      {stat.trend === 'up' && (
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-500 dark:text-emerald-400">
                          <ArrowUpRight className="h-3 w-3" />
                          {stat.change}
                        </span>
                      )}
                      {stat.trend === 'neutral' && (
                        <span className="text-xs text-foreground-tertiary">{stat.change}</span>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-sm text-foreground-tertiary">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Quick Actions - Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions Card */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Link
                      href="/try-on"
                      className="group flex items-center gap-4 rounded-xl border border-subtle bg-overlay-2 p-4 transition-all duration-150 hover:bg-orange-500/5 hover:border-orange-500/20"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                        <Plus className="h-6 w-6 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-orange-400 transition-colors">
                          Try On Clothes
                        </h3>
                        <p className="text-sm text-foreground-tertiary">See how clothes look on you</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-foreground-tertiary group-hover:text-orange-400 transition-colors" />
                    </Link>

                    <Link
                      href="/gallery"
                      className="group flex items-center gap-4 rounded-xl border border-subtle bg-overlay-2 p-4 transition-all duration-150 hover:bg-overlay-4 hover:border-muted"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-overlay-4">
                        <ImageIcon className="h-6 w-6 text-foreground-secondary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">My Gallery</h3>
                        <p className="text-sm text-foreground-tertiary">View saved try-ons & images</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-foreground-tertiary group-hover:text-foreground transition-colors" />
                    </Link>
                  </div>

                  {/* Business Actions */}
                  <div className="mt-4 pt-4 border-t border-subtle">
                    <p className="text-xs font-medium text-foreground-tertiary mb-3">For Business</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Link
                        href="/billing"
                        className="flex items-center gap-3 rounded-lg border border-subtle bg-overlay-2 px-3 py-2 hover:bg-overlay-4 transition-colors"
                      >
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-foreground-secondary">Analytics</span>
                      </Link>
                      <Link
                        href="/gallery"
                        className="flex items-center gap-3 rounded-lg border border-subtle bg-overlay-2 px-3 py-2 hover:bg-overlay-4 transition-colors"
                      >
                        <ImageIcon className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-foreground-secondary">Export Images</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
                    <Link href="#" className="text-sm text-foreground-tertiary hover:text-foreground transition-colors">
                      View all
                    </Link>
                  </div>

                  {recentActivity.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivity.map((activity, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-4 p-3 rounded-xl hover:bg-overlay-2 transition-colors"
                        >
                          <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                            activity.status === 'success' ? 'bg-emerald-500/10' : 'bg-blue-500/10'
                          }`}>
                            <CheckCircle2 className={`h-4 w-4 ${
                              activity.status === 'success' ? 'text-emerald-500 dark:text-emerald-400' : 'text-blue-400'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{activity.action}</p>
                            <p className="text-sm text-foreground-tertiary truncate">{activity.item}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-foreground-tertiary">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm text-foreground-tertiary">No recent activity</p>
                      <p className="text-xs text-foreground-tertiary mt-1">Create your first try-on to get started</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Credits Card */}
                <div className="card-highlight">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-foreground">Credits</h2>
                    <Sparkles className="h-5 w-5 text-orange-400" />
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-5xl font-bold text-foreground">{user?.credits || 0}</p>
                    <p className="mt-2 text-sm text-foreground-tertiary">credits remaining</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-orange-500/10">
                    <Link
                      href="/billing"
                      className="btn-primary w-full justify-center"
                    >
                      Buy more credits
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Plan Card */}
                <div className="card">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-foreground">Your Plan</h2>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-foreground capitalize">
                        {user?.subscription || 'Free'}
                      </span>
                      <span className="badge-accent">Active</span>
                    </div>
                    <p className="mt-2 text-sm text-foreground-tertiary">
                      {user?.subscription === 'free' 
                        ? 'Upgrade to get more credits and features'
                        : 'Enjoying premium features'
                      }
                    </p>
                  </div>

                  <Link
                    href="/billing"
                    className="mt-4 flex items-center gap-1 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    {user?.subscription === 'free' ? 'Upgrade plan' : 'Manage subscription'}
                    <ArrowRight className="h-4 w-4" />
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
