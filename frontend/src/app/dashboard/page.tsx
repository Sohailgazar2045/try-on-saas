'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authAPI } from '@/lib/api';
import { CreditCounter } from '@/components/CreditCounter';
import { Sparkles, Image as ImageIcon, Gallery } from 'lucide-react';

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
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-primary-700">
            Virtual Try-On
          </Link>
          <div className="flex gap-4 items-center">
            <CreditCounter credits={user?.credits || 0} />
            <Link href="/profile" className="text-gray-700 hover:text-gray-900">
              Profile
            </Link>
            <button
              onClick={async () => {
                await authAPI.logout();
                router.push('/');
              }}
              className="text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Welcome back, {user?.name || user?.email}!
        </h1>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/try-on"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition">
                <Sparkles className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold">Try-On</h2>
            </div>
            <p className="text-gray-600">Generate AI try-on images</p>
          </Link>

          <Link
            href="/gallery"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition">
                <Gallery className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold">Gallery</h2>
            </div>
            <p className="text-gray-600">View your saved images</p>
          </Link>

          <Link
            href="/billing"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition">
                <ImageIcon className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold">Billing</h2>
            </div>
            <p className="text-gray-600">Purchase credits or subscribe</p>
          </Link>
        </div>

        {/* Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600">Credits Remaining</p>
              <p className="text-3xl font-bold text-primary-600">{user?.credits || 0}</p>
            </div>
            <div>
              <p className="text-gray-600">Subscription</p>
              <p className="text-3xl font-bold text-gray-900">
                {user?.subscription || 'Free'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Member Since</p>
              <p className="text-lg font-semibold text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

