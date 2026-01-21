'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authAPI } from '@/lib/api';
import { Sidebar } from '@/components/Sidebar';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Use the mocked auth profile in this demo environment
      const response = await authAPI.getProfile();
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to load profile (demo mode):', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await userAPI.updateProfile(data);
      toast.success('Profile updated successfully');
      fetchProfile();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await userAPI.deleteAccount();
      toast.success('Account deleted');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar user={user} />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold text-slate-100">Profile settings</h1>
              <p className="text-xs text-slate-500">
                Keep your workspace details up to date for smoother collaboration.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-6">
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-100">Account information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-200">
                Name
              </label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                {...register('name')}
                className="input-field"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-200">
                Email
              </label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                {...register('email', { required: 'Email is required' })}
                className="input-field"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message as string}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-200">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                {...register('password', {
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                className="input-field"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message as string}</p>
              )}
            </div>

            <button
              type="submit"
              className="primary-button mt-2 w-full justify-center"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-red-900/70 bg-red-950/40 p-6 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-red-200">Danger zone</h2>
          <button
            onClick={handleDeleteAccount}
            className="rounded-lg bg-red-600 px-5 py-2 text-xs font-semibold text-white hover:bg-red-500"
          >
            Delete Account
          </button>
          <p className="mt-2 text-xs text-red-200/80">
            This will permanently delete your account and all associated data.
          </p>
        </div>
        </div>
      </main>
    </div>
  );
}

