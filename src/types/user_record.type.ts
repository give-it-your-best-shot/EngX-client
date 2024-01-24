export interface UserRecord {
  id: number;
  numQuestion: number;
  score: number;
  createdAt: string;
  passed: boolean;
}

export interface UnitRecord extends UserRecord {
  unitId: number;
}

export interface BookRecord extends UserRecord {
  bookId: number;
}
