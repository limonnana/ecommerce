import { ICategory } from 'app/shared/model/category.model';

export interface IKeyWord {
  id?: number;
  name?: string;
  category?: ICategory;
}

export class KeyWord implements IKeyWord {
  constructor(public id?: number, public name?: string, public category?: ICategory) {}
}
