import { IProduct } from 'app/shared/model/product.model';

export interface ICategory {
  id?: number;
  name?: string;
  productLists?: IProduct[];
  category?: string;
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public productLists?: IProduct[], public category?: string) {}
}
