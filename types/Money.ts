interface IMoney {
  id?: number;
  amount: number;
  fromPerson: string; // name of that person
  isDone?: boolean;
  createData?: Date;
}

export type {
  IMoney
};

