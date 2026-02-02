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
            background: '#18181b',
            color: '#fafafa',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            fontSize: '14px',
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
