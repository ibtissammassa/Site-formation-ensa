import { create } from "zustand";

const store = (set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  user: {},
  setUser: (user) => set({ user }),
});

export const useStore = create(store);
