'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CreditCounter } from './CreditCounter';
import { authAPI } from '@/lib/api';
import {
  LayoutDashboard,
  Sparkles,
  Image as ImageIcon,
  CreditCard,
  User,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  user?: any;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/try-on', icon: Sparkles, label: 'Try-On' },
    { href: '/gallery', icon: ImageIcon, label: 'Gallery' },
    { href: '/billing', icon: CreditCard, label: 'Billing' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800/50 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95 shadow-2xl shadow-black/20">
      {/* Logo Section - Fixed at top */}
      <div className="shrink-0 flex h-20 items-center gap-3 border-b border-slate-800/50 px-6">
        <div className="relative cursor-pointer group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 via-primary-400 to-sky-400 shadow-lg shadow-primary-500/30 transition-all duration-200 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-slate-100">
            Virtual Try-On
          </span>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
            AI Studio
          </span>
        </div>
      </div>

      {/* Navigation - Middle section */}
      <nav className="flex-1 space-y-1.5 overflow-hidden px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500/20 to-primary-500/10 text-primary-300'
                  : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary-400 to-primary-600" />
              )}
              
              <Icon className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300'
              }`} />
              
              <span className={isActive ? 'font-semibold' : 'font-medium'}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Section - Sticky at bottom, not scrollable */}
      <div className="shrink-0 mt-auto border-t border-slate-800/50 bg-slate-950/50 p-4 backdrop-blur-sm">
        {/* User Profile */}
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-3 ring-1 ring-slate-800/50">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 via-primary-500 to-sky-500 shadow-lg shadow-primary-500/30">
            <span className="text-xs font-bold text-white">
              {(user?.name || user?.email || 'U')[0].toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-100">
              {user?.name || user?.email || 'User'}
            </p>
            <p className="truncate text-[10px] font-medium text-slate-500">
              {user?.email || 'demo@tryon.dev'}
            </p>
          </div>
        </div>

        {/* Credits */}
        <div className="mb-3">
          <CreditCounter credits={user?.credits || 0} />
        </div>

        {/* Sign Out Button */}
        <button
          onClick={async () => {
            await authAPI.logout();
            router.push('/');
          }}
          className="flex w-full items-center gap-2.5 rounded-xl border border-slate-800/50 bg-slate-900/30 px-3.5 py-2.5 text-xs font-medium text-slate-400 transition-colors duration-200 hover:border-red-500/50 hover:bg-red-950/30 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

