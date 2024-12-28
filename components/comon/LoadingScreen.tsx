// components/LoadingScreen.tsx
'use client';

import { useState, useEffect } from 'react';
import { useLoadingStore } from '@/lib/useLoadingStore';
import type {} from 'ldrs';

export default function LoadingScreen() {
  const { isFirstLoading, setIsFirstLoading } = useLoadingStore();

  useEffect(() => {
    if (isFirstLoading) {
      const timer = setTimeout(() => {
        setIsFirstLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isFirstLoading, setIsFirstLoading]);

  if (!isFirstLoading) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[200]">
      <l-helix size="45" speed="2.5" color="white"></l-helix>
    </div>
  );
}