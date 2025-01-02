'use client';

import { useState, useEffect } from 'react';
import { useLoadingStore } from '@/lib/useLoadingStore';
import type {} from 'ldrs';

export default function LoadingScreen() {
  const { isFirstLoading, setIsFirstLoading } = useLoadingStore();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // lottieファイルを読み込む
    import('ldrs').then(({ quantum }) => quantum.register());

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
      <l-quantum
        size="100"
        speed="5" 
        color="black" 
      ></l-quantum>
    </div>
  );
}