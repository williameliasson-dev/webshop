export interface Product {
  id: string;
  title: string;
  desc: string;
  imgLink: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
}

export interface Suggestion {
  id: string;
  title: string;
}

export interface Category {
  category: string;
}

export interface Results {
  products: Array<Product>;
  suggestions: Array<Suggestion>;
  categories: Array<Category>;
}
