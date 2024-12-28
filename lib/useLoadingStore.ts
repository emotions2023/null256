// lib/store/useLoadingStore.ts
import { create } from 'zustand';

type LoadingStore = {
  isFirstLoading: boolean;
  setIsFirstLoading: (loading: boolean) => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  isFirstLoading: true,
  setIsFirstLoading: (loading) => set({ isFirstLoading: loading }),
}));