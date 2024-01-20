import { Unit } from "./unit.type";

export interface Book {
  id: number;
  name: string;
  units: Unit[];
}
