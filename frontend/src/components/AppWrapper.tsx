'use client';

import { BackgroundAnimation } from './BackgroundAnimation';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundAnimation />
      {children}
    </>
  );
}


