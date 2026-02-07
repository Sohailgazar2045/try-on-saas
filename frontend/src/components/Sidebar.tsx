'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { useTheme } from './ThemeProvider';
import {
  LayoutDashboard,
  Sparkles,
  Image as ImageIcon,
  CreditCard,
  User,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
  X,
} from 'lucide-react';

interface SidebarProps {
  user?: any;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ user, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/try-on', icon: Sparkles, label: 'Try-On Studio' },
    { href: '/gallery', icon: ImageIcon, label: 'Gallery' },
    { href: '/billing', icon: CreditCard, label: 'Billing' },
  ];

  const bottomItems = [
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex h-screen w-60 flex-col bg-surface-alt border-r border-subtle transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex h-12 items-center justify-between gap-2.5 px-4 border-b border-subtle shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-foreground">Virtual Try-On</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-overlay-4 text-foreground-tertiary"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                isActive
                  ? 'bg-orange-500/10 text-orange-500 dark:text-orange-400'
                  : 'text-foreground-secondary hover:bg-overlay-4 hover:text-foreground'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-orange-500 dark:text-orange-400' : ''}`} />
              <span>{item.label}</span>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 ml-auto text-orange-500/50 dark:text-orange-400/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-subtle px-2 py-2 space-y-1.5 shrink-0">
        {/* Credits */}
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/10 px-3 py-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400" />
            <span className="text-xs font-medium text-foreground-secondary">Credits</span>
          </div>
          <span className="text-sm font-bold text-foreground">{user?.credits || 0}</span>
        </div>

        {/* Profile */}
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                isActive
                  ? 'bg-overlay-6 text-foreground'
                  : 'text-foreground-secondary hover:bg-overlay-4 hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* User Info + Theme Toggle + Sign Out */}
        <div className="flex items-center gap-2 rounded-lg bg-overlay-2 border border-subtle px-2.5 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shrink-0">
            <span className="text-xs font-bold text-white">
              {(user?.name || user?.email || 'U')[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-[10px] text-foreground-tertiary truncate">
              {user?.email || 'demo@tryon.dev'}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="shrink-0 rounded-md p-1 text-foreground-tertiary hover:bg-overlay-6 hover:text-foreground transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={async () => {
              await authAPI.logout();
              router.push('/');
            }}
            className="shrink-0 rounded-md p-1 text-foreground-tertiary hover:bg-red-500/10 hover:text-red-400 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
