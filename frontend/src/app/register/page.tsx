'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { authAPI } from '@/lib/api';
import { setAuthToken } from '@/lib/auth';
import toast from 'react-hot-toast';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.register({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      setAuthToken(response.data.token);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid w-full gap-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-900/50 backdrop-blur sm:p-8 md:grid-cols-[1.1fr,1fr]">
          {/* Brand side */}
          <div className="flex flex-col justify-start space-y-8 border-b border-slate-800 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                <span className="h-8 w-8 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40" />
                <span>Virtual Try-On</span>
              </Link>

              <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Create your workspace in under a minute.
              </h1>
              <p className="mt-4 max-w-md text-sm text-slate-400">
                Spin up a demo account for exploring flows. No credit card, no backend, just the full product surface.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Visualize outfits on realistic models.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Preview gallery, billing, and profile flows end‑to‑end.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form side */}
          <div className="flex flex-col justify-start py-2">
            <div className="mb-5 space-y-2">
              <h2 className="text-lg font-semibold leading-none">Create a demo account</h2>
              <p className="text-sm text-slate-400">
                This environment is ephemeral and safe to experiment with.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-200">
                  Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Brand team, stylist, or your name"
                  className="input-field"
                />
              </div>

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
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  placeholder="At least 6 characters"
                  className="input-field"
                />
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-200">
                  Confirm password
                </label>
                <input
                  type="password"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  placeholder="Re‑enter password"
                  className="input-field"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="primary-button mt-2 w-full justify-center"
              >
                {loading ? 'Creating account…' : 'Create demo workspace'}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Already exploring?{' '}
              <Link href="/login" className="font-medium text-primary-400 hover:text-primary-300">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

