'use client';

import { Toaster } from 'react-hot-toast';

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fafafa',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fafafa',
            },
          },
        }}
      />
    </>
  );
}
