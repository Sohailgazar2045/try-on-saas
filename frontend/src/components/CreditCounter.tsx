'use client';

import { Sparkles } from 'lucide-react';

interface CreditCounterProps {
  credits: number;
}

export function CreditCounter({ credits }: CreditCounterProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-2">
      <Sparkles className="h-4 w-4 text-orange-400" />
      <span className="text-sm font-semibold text-orange-400">{credits}</span>
      <span className="text-xs text-orange-400/70">credits</span>
    </div>
  );
}
