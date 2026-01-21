'use client';

import { Coins } from 'lucide-react';

export function CreditCounter({ credits }: { credits: number }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-primary-500/20 bg-primary-500/10 px-3 py-2">
      <Coins className="h-4 w-4 text-primary-400" />
      <span className="text-sm font-semibold text-primary-300">{credits}</span>
      <span className="text-xs text-slate-500">credits</span>
    </div>
  );
}

