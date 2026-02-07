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
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-orange-600 to-orange-500 px-3 sm:px-4 py-2 sm:py-2.5">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white/20 shrink-0">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-white">
            <span className="hidden md:inline">You're exploring the demo. </span>
            <span className="hidden sm:inline font-normal text-white/90">Sign up to save your work and unlock all features.</span>
            <span className="sm:hidden font-normal text-white/90">Sign up to save your work.</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={handleSignUp}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-50 whitespace-nowrap"
          >
            <span className="hidden xs:inline">Sign up free</span>
            <span className="xs:hidden">Sign up</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
          <button
            onClick={handleExit}
            className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white shrink-0"
            aria-label="Close banner"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

