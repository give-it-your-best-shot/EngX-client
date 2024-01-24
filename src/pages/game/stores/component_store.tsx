import { create } from "zustand";

export type ComponentStore = {
  x: number;
  y: number;
  width: number;
  height: number;

  setX(x: number): void;
  setY(y: number): void;
  setWidth(width: number): void;
  setHeight(height: number): void;
};

const useEngXBotStore = create<ComponentStore>((set) => ({
  x: 0,
  y: -100,
  width: 512,
  height: 512,
  setX: (x: number) => set(() => ({ x: x })),
  setY: (y: number) => set(() => ({ y: y })),
  setWidth: (height: number) => set(() => ({ height: height })),
  setHeight: (width: number) => set(() => ({ width: width })),
}));

export { useEngXBotStore };
