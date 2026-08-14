interface IMoney {
  id?: number;
  amount: number;
  fromPerson: string; // name of that person
  isDone?: boolean;
}

export type {
    IMoney
};
