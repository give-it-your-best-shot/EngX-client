import { Word } from "./word.type";

export interface Chapter {
    id: number;
    name: string;
    photoURL: string;
    description: string;
    words: string[];
  }