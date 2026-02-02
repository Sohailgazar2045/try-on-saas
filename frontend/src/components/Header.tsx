'use client';

import { useState } from 'react';
import { User, LogOut, Settings, Bell, ChevronDown, CreditCard, ExternalLink } from 'lucide-react';
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
    <header className="shrink-0 h-16 flex items-center justify-between px-6 lg:px-8 border-b border-white/[0.06] bg-[#0a0a0b]">
      {/* Left Section */}
      <div>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-zinc-500">{subtitle}</p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        {showNotifications && (
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setDropdownOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 hover:bg-white/[0.04] hover:text-white transition-all"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500" />
            </button>

            {notificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setNotificationsOpen(false)} 
                />
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/[0.06] bg-[#111113] p-4 shadow-2xl z-50">
                  <h3 className="text-sm font-semibold text-white mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
                      <p className="text-sm font-medium text-emerald-400">Try-on completed</p>
                      <p className="mt-1 text-xs text-zinc-500">Your latest batch is ready</p>
                      <p className="mt-2 text-[11px] text-zinc-600">2 minutes ago</p>
                    </div>
                    <div className="rounded-xl bg-orange-500/5 border border-orange-500/10 p-3">
                      <p className="text-sm font-medium text-orange-400">Credits added</p>
                      <p className="mt-1 text-xs text-zinc-500">Your subscription added 100 credits</p>
                      <p className="mt-2 text-[11px] text-zinc-600">1 hour ago</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full rounded-xl bg-white/[0.04] py-2.5 text-sm font-medium text-zinc-400 hover:bg-white/[0.06] hover:text-white transition-colors">
                    View all notifications
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
              <span className="text-xs font-bold text-white">
                {(user?.name || user?.email || 'U')[0].toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-zinc-500">{user?.credits || 0} credits</p>
            </div>
            <ChevronDown className="h-4 w-4 text-zinc-500 hidden sm:block" />
          </button>

          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setDropdownOpen(false)} 
              />
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/[0.06] bg-[#111113] overflow-hidden shadow-2xl z-50">
                <div className="p-3 border-b border-white/[0.06]">
                  <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{user?.email || 'demo@tryon.dev'}</p>
                </div>
                
                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/billing"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <CreditCard className="h-4 w-4" />
                    Billing
                  </Link>
                </div>

                <div className="p-2 border-t border-white/[0.06]">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
