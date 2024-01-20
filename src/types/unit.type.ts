import { Word } from "./word.type";

export interface Unit {
  id: number;
  name: string;
  words: Word[];
}
