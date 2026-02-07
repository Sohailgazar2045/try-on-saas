'use client';

import { useState } from 'react';
import { User, LogOut, Bell, ChevronDown, CreditCard } from 'lucide-react';
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
    <header className="shrink-0 h-16 flex items-center justify-between px-6 lg:px-8 border-b border-subtle bg-surface">
      {/* Left Section */}
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-foreground-tertiary">{subtitle}</p>
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
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-foreground-secondary hover:bg-overlay-4 hover:text-foreground transition-all"
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
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-subtle bg-surface-alt p-4 shadow-2xl z-50">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
                      <p className="text-sm font-medium text-emerald-500 dark:text-emerald-400">Try-on completed</p>
                      <p className="mt-1 text-xs text-foreground-tertiary">Your latest batch is ready</p>
                      <p className="mt-2 text-[11px] text-foreground-tertiary">2 minutes ago</p>
                    </div>
                    <div className="rounded-xl bg-orange-500/5 border border-orange-500/10 p-3">
                      <p className="text-sm font-medium text-orange-500 dark:text-orange-400">Credits added</p>
                      <p className="mt-1 text-xs text-foreground-tertiary">Your subscription added 100 credits</p>
                      <p className="mt-2 text-[11px] text-foreground-tertiary">1 hour ago</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full rounded-xl bg-overlay-4 py-2.5 text-sm font-medium text-foreground-secondary hover:bg-overlay-6 hover:text-foreground transition-colors">
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
            className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-overlay-4 transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
              <span className="text-xs font-bold text-white">
                {(user?.name || user?.email || 'U')[0].toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
              <p className="text-xs text-foreground-tertiary">{user?.credits || 0} credits</p>
            </div>
            <ChevronDown className="h-4 w-4 text-foreground-tertiary hidden sm:block" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-subtle bg-surface-alt overflow-hidden shadow-2xl z-50">
                <div className="p-3 border-b border-subtle">
                  <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
                  <p className="text-xs text-foreground-tertiary mt-0.5">{user?.email || 'demo@tryon.dev'}</p>
                </div>

                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground-secondary hover:bg-overlay-4 hover:text-foreground transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/billing"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground-secondary hover:bg-overlay-4 hover:text-foreground transition-colors"
                  >
                    <CreditCard className="h-4 w-4" />
                    Billing
                  </Link>
                </div>

                <div className="p-2 border-t border-subtle">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 dark:text-red-400 hover:bg-red-500/10 transition-colors"
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
