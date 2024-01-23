import { create } from "zustand";

export type GameStore = {
  width: number;
  setWidth: (width: number) => void;
  height: number;
  setHeight: (height: number) => void;
  isLoading: boolean;
  setLoading: (status: boolean) => void;
};

const useGameStore = create<GameStore>((set) => ({
  width: window.innerWidth / 1.15,
  height: window.innerHeight / 1.15,
  setWidth: (width: number) => set(() => ({ width: width })),
  setHeight: (height: number) => set(() => ({ height: height })),
  isLoading: true,
  setLoading: (status: boolean) => set(() => ({ isLoading: status })),
}));

export default useGameStore;
