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
  ChevronRight,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  user?: any;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

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
    <aside className="flex h-screen w-64 flex-col bg-[#111113] border-r border-white/[0.06]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-white/[0.06]">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">Virtual Try-On</span>
          <span className="text-[10px] font-medium text-zinc-500">Studio</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-orange-500/10 text-orange-400'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-orange-400' : ''}`} />
              <span>{item.label}</span>
              {isActive && (
                <ChevronRight className="h-4 w-4 ml-auto text-orange-400/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-white/[0.06] p-4 space-y-4">
        {/* Credits Card */}
        <div className="rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Credits</span>
            <Sparkles className="h-4 w-4 text-orange-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{user?.credits || 0}</p>
          <Link 
            href="/billing" 
            className="mt-3 flex items-center gap-1 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
          >
            Buy more credits
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Profile & Settings */}
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white/[0.06] text-white'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* User Info */}
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
            <span className="text-sm font-bold text-white">
              {(user?.name || user?.email || 'U')[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-zinc-500 truncate">
              {user?.email || 'demo@tryon.dev'}
            </p>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={async () => {
            await authAPI.logout();
            router.push('/');
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-150 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
