interface IMoney {
  id?: number;
  amount: number;
  fromPerson: string; // name of that person
  isDone?: boolean;
  createdAt?: Date;
}

export type {
  IMoney
};

