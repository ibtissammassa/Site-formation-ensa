import { create } from "zustand";

const store = (set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  user: {},
  setUser: (user) => set({ user }),
  userRole: "prof",
  setUserRole: (userRole) => set({ userRole }),
});

export const useStore = create(store);
