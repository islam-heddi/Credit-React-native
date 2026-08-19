interface IMoney {
  id?: number;
  amount: number;
  fromPerson: string; // name of that person
  isDone?: boolean;
  createDate?: string;
}

export type {
  IMoney
};

