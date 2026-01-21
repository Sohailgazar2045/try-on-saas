'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { authAPI } from '@/lib/api';
import { setAuthToken } from '@/lib/auth';
import toast from 'react-hot-toast';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const response = await authAPI.login(data);
      setAuthToken(response.data.token);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-900/50 backdrop-blur sm:p-10 md:grid-cols-[1.1fr,1fr]">
          {/* Brand / marketing side */}
          <div className="flex flex-col justify-between space-y-10 border-b border-slate-800 pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-10">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                <span className="h-8 w-8 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40" />
                <span>Virtual Try-On</span>
              </Link>

              <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome back to your AI fitting room.
              </h1>
              <p className="mt-4 max-w-md text-sm text-slate-400">
                Log in to generate new try-ons, manage your gallery, and experiment with outfits in seconds.
              </p>

              <div className="mt-6 grid gap-3 text-xs text-slate-300 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="font-medium">Realtime previews</p>
                  <p className="mt-1 text-slate-400">Upload, combine, and view AI renders in a streamlined flow.</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="font-medium">Designed for teams</p>
                  <p className="mt-1 text-slate-400">Built for fashion brands, marketplaces, and growth experiments.</p>
                </div>
              </div>
            </div>

            <div className="hidden text-xs text-slate-500 md:block">
              <p>Demo environment &mdash; no backend required.</p>
            </div>
          </div>

          {/* Form side */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 space-y-2">
              <h2 className="text-lg font-semibold leading-none">Sign in</h2>
              <p className="text-sm text-slate-400">
                Use the demo credentials below to explore the product.
              </p>
              <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs text-emerald-100">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono">demo@tryon.dev</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                    Email
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono">Password123!</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                    Password
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  placeholder="you@brand.com"
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-200">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  placeholder="••••••••"
                  className="input-field"
                />
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="primary-button mt-2 w-full justify-center"
              >
                {loading ? 'Logging in…' : 'Continue to dashboard'}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-primary-400 hover:text-primary-300">
                Create a demo account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

