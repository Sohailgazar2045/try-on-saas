'use client';

import { Coins } from 'lucide-react';

export function CreditCounter({ credits }: { credits: number }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg">
      <Coins className="w-5 h-5 text-primary-600" />
      <span className="font-semibold text-primary-700">{credits}</span>
      <span className="text-sm text-gray-600">credits</span>
    </div>
  );
}

