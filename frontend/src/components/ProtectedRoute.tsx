'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, isDemoMode } from '@/lib/auth';
import { DemoBanner } from './DemoBanner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isDemo, setIsDemo] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const demo = isDemoMode();
      const authed = isAuthenticated();
      
      setIsDemo(demo);
      setIsAuthed(authed);
      setLoading(false);

      if (!authed && !demo) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0b]">
        <div className="flex flex-col items-center gap-4">
          <svg className="h-8 w-8 animate-spin text-orange-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthed && !isDemo) {
    return null;
  }

  return (
    <>
      {isDemo && <DemoBanner />}
      <div className={isDemo ? 'pt-10' : ''}>
        {children}
      </div>
    </>
  );
}
