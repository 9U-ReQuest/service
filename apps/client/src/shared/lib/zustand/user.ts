import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProps {
  name?: string;
  email?: string;
}

interface UserState {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: { name: undefined, email: undefined },
      setUser: (user: UserProps) => set({ user }),
    }),
    {
      name: "user-storage",
    },
  ),
);
