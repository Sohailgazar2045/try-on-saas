'use client';

import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function GenerateButton({ onClick, disabled, loading }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="btn-primary px-12 py-4 text-base disabled:opacity-40"
    >
      {loading ? (
        <span className="flex items-center gap-3">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Generating...
        </span>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          Generate Try-On
          <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
            1 credit
          </span>
        </>
      )}
    </button>
  );
}
