import { Product } from "@prisma/client";

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
