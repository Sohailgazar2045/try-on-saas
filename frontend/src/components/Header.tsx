'use client';

import { useState } from 'react';
import { User, LogOut, Bell, ChevronDown, CreditCard, Menu, Sun, Moon } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  user?: any;
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
  onMenuClick?: () => void;
}

export function Header({ user, title, subtitle, showNotifications = true, onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    await authAPI.logout();
    router.push('/');
  };

  return (
    <header className="shrink-0 h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 border-b border-subtle bg-surface">
      {/* Left Section */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-overlay-4 text-foreground-secondary hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-foreground-tertiary truncate hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Theme Toggle - Visible on mobile */}
        <button
          onClick={toggleTheme}
          className="lg:hidden flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-foreground-secondary hover:bg-overlay-4 hover:text-foreground transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
        </button>

        {/* Notifications */}
        {showNotifications && (
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setDropdownOpen(false);
              }}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-foreground-secondary hover:bg-overlay-4 hover:text-foreground transition-all"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-orange-500" />
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-subtle bg-surface-alt p-4 shadow-2xl z-50">
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
            className="flex items-center gap-2 sm:gap-3 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-overlay-4 transition-all"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shrink-0">
              <span className="text-xs font-bold text-white">
                {(user?.name || user?.email || 'U')[0].toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block text-left min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-foreground-tertiary">{user?.credits || 0} credits</p>
            </div>
            <ChevronDown className="h-4 w-4 text-foreground-tertiary hidden md:block shrink-0" />
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
