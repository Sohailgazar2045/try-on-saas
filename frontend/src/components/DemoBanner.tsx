'use client';

import { useRouter } from 'next/navigation';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { disableDemoMode, isDemoMode } from '@/lib/auth';
import { useState, useEffect } from 'react';

export function DemoBanner() {
  const router = useRouter();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    setIsDemo(isDemoMode());
  }, []);

  if (!isDemo) return null;

  const handleExit = () => {
    disableDemoMode();
    router.push('/');
  };

  const handleSignUp = () => {
    disableDemoMode();
    router.push('/register');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-2.5">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <p className="text-sm font-medium text-white">
            <span className="hidden sm:inline">You're exploring the demo. </span>
            <span className="font-normal text-white/90">Sign up to save your work and unlock all features.</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSignUp}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-50"
          >
            Sign up free
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleExit}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

