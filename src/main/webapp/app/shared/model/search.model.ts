export interface ISearch {
  query?: string;
}

export class Search implements ISearch {
  constructor(public query?: string) {}
}
