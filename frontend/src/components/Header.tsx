'use client';

import { useState } from 'react';
import { User, LogOut, Settings, Bell, ChevronDown } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface HeaderProps {
  user?: any;
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
}

export function Header({ user, title, subtitle, showNotifications = true }: HeaderProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    await authAPI.logout();
    router.push('/');
  };

  return (
    <header className="shrink-0 border-b border-slate-800/80 bg-gradient-to-r from-slate-950 to-slate-950/80 backdrop-blur-xl overflow-visible relative z-40">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section */}
        <div>
          <h1 className="text-lg font-bold text-slate-100">{title}</h1>
          {subtitle && (
            <p className="text-xs text-slate-500">{subtitle}</p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          {showNotifications && (
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="group relative rounded-lg p-2 text-slate-400 transition-all duration-300 hover:bg-slate-900/50 hover:text-slate-300"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl z-[9999]">
                  <div className="space-y-3 max-h-96 overflow-auto">
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                      <p className="text-xs font-medium text-emerald-400">Try-on completed</p>
                      <p className="mt-1 text-xs text-slate-400">Your latest batch is ready to review</p>
                      <p className="mt-2 text-[10px] text-slate-500">2 minutes ago</p>
                    </div>
                    <div className="rounded-lg border border-primary-500/20 bg-primary-500/5 p-3">
                      <p className="text-xs font-medium text-primary-400">Credits added</p>
                      <p className="mt-1 text-xs text-slate-400">Your subscription renewal added 100 credits</p>
                      <p className="mt-2 text-[10px] text-slate-500">1 hour ago</p>
                    </div>
                  </div>
                  <button className="mt-3 w-full rounded-lg border border-slate-800 bg-slate-900/50 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 transition-all duration-300 hover:bg-slate-900/50"
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/20">
                <span className="text-xs font-bold text-white">
                  {(user?.name || user?.email || 'U')[0].toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-slate-100">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-500">Pro</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:text-slate-300" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl z-[9999] overflow-hidden">
                <div className="border-b border-slate-800/50 p-3">
                  <p className="text-xs font-medium text-slate-300">{user?.email}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{user?.credits || 0} credits remaining</p>
                </div>
                <div className="space-y-1 p-2">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-900/50 hover:text-slate-100"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/billing"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-900/50 hover:text-slate-100"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>
                <div className="border-t border-slate-800/50 p-2">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-950/20"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
