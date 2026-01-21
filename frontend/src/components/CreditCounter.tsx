'use client';

import { Coins } from 'lucide-react';

export function CreditCounter({ credits }: { credits: number }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary-500/30 bg-gradient-to-br from-primary-500/15 via-primary-500/10 to-transparent px-3.5 py-2.5 ring-1 ring-primary-500/10 transition-all duration-200 hover:border-primary-500/40 hover:bg-primary-500/20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="relative flex items-center gap-2.5">
        <div className="rounded-lg bg-primary-500/20 p-1 ring-1 ring-primary-500/20">
          <Coins className="h-3.5 w-3.5 text-primary-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold leading-none text-primary-300">{credits}</span>
          <span className="text-[10px] font-medium leading-none text-slate-500">credits</span>
        </div>
      </div>
    </div>
  );
}

