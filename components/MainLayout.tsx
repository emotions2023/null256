// components/MainLayout.tsx
'use client';

import Navigation from "./comon/Navigation";
import { useLoadingStore } from '@/lib/useLoadingStore';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isFirstLoading } = useLoadingStore();

  return (
    <main className="min-h-screen bg-white text-black font-biz-udp-mincho tracking-[0.3em]">
      {!isFirstLoading && (
        <>
          <div className="fixed w-full top-4 z-[150]">
            <Navigation />
          </div>
          {children}
        </>
      )}
    </main>
  );
}