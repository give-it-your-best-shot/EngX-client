import { User } from "src/types/user.type";
import { create } from "zustand";

type AuthenticationStore = {
  user: User | null | undefined;
  setUser: (u: User | null | undefined) => void;
};

const useAuthenticationStore = create<AuthenticationStore>((set) => ({
  user: undefined,
  setUser: (u: User | null | undefined) => set(() => ({ user: u })),
}));

export default useAuthenticationStore;
