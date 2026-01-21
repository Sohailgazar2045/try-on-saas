'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { imageAPI, authAPI } from '@/lib/api';
import { CreditCounter } from '@/components/CreditCounter';
import { Trash2, LayoutDashboard, Sparkles, Image as ImageIcon, CreditCard, User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GalleryPage() {
  return (
    <ProtectedRoute>
      <GalleryContent />
    </ProtectedRoute>
  );
}

function GalleryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', active: pathname === '/dashboard' },
    { href: '/try-on', icon: Sparkles, label: 'Try-On', active: pathname === '/try-on' },
    { href: '/gallery', icon: ImageIcon, label: 'Gallery', active: pathname === '/gallery' },
    { href: '/billing', icon: CreditCard, label: 'Billing', active: pathname === '/billing' },
    { href: '/profile', icon: User, label: 'Profile', active: pathname === '/profile' },
  ];

  useEffect(() => {
    fetchUserData();
    fetchImages();
  }, [filter]);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to load profile for gallery (demo mode):', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await imageAPI.getAll(filter === 'all' ? undefined : filter);
      setImages(response.data.images);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await imageAPI.delete(id);
      toast.success('Image deleted');
      fetchImages();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const filteredImages = images.filter((img) => {
    if (filter === 'all') return true;
    return img.type === filter;
  });

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar (same shell as dashboard) */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-950/95 backdrop-blur">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-4">
            <span className="h-8 w-8 shrink-0 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40" />
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              Virtual Try-On
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-primary-500/10 text-primary-300'
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-slate-800/80 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary-400 to-sky-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-200">
                  {user?.name || user?.email || 'User'}
                </p>
                <p className="truncate text-[10px] text-slate-500">
                  {user?.email || 'demo@tryon.dev'}
                </p>
              </div>
            </div>
            <CreditCounter credits={user?.credits || 0} />
            <button
              onClick={async () => {
                await authAPI.logout();
                router.push('/');
              }}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-900/50 hover:text-slate-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold text-slate-100">Gallery</h1>
              <p className="text-xs text-slate-500">
                Review generated try-ons, person photos, and garments in a single grid.
              </p>
            </div>
          </div>
        </header>

        <div className="px-6 py-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="page-heading">Gallery</h1>
            <p className="subheading mt-1">
              Review generated try-ons, person photos, and garments in a single grid.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-full px-4 py-1.5 text-xs ${
                filter === 'all'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-200 border border-slate-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('user')}
              className={`rounded-full px-4 py-1.5 text-xs ${
                filter === 'user'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-200 border border-slate-700'
              }`}
            >
              My Photos
            </button>
            <button
              onClick={() => setFilter('outfit')}
              className={`rounded-full px-4 py-1.5 text-xs ${
                filter === 'outfit'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-200 border border-slate-700'
              }`}
            >
              Outfits
            </button>
            <button
              onClick={() => setFilter('generated')}
              className={`rounded-full px-4 py-1.5 text-xs ${
                filter === 'generated'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-200 border border-slate-700'
              }`}
            >
              Generated
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">Loading…</div>
        ) : filteredImages.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-400">
            No images found. Start by generating a new try-on in the workspace.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm"
              >
                <img
                  src={image.url}
                  alt={image.type}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-xs font-medium capitalize text-slate-200">{image.type}</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="absolute right-2 top-2 rounded-full bg-red-500/90 p-1.5 text-white opacity-0 shadow-sm transition group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        </div>
      </main>
    </div>
  );
}

