export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
  pictureUrl?: string;
  keyWords?: string;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public category?: string,
    public pictureUrl?: string,
    public keyWords?: string
  ) {}
}
