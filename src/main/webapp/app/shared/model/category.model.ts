import { IProduct } from 'app/shared/model/product.model';

export interface ICategory {
  id?: number;
  name?: string;
  products?: IProduct[];
  categories?: ICategory[];
  category?: string;
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string,
    public products?: IProduct[],
    public categories?: ICategory[],
    public category?: string
  ) {}
}
