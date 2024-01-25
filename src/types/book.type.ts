import { Unit } from "./unit.type";

export interface Book {
  id: number;
  name: string;
  description: string;
  units: Unit[];
}
