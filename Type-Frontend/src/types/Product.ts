export interface Review {
  user: string; // ObjectId as string or plain name (depending on schema)
  comment: string;
  rating: number;
}

export interface Product {
  _id?: string;
  title: string;
  description?: string;
  price: number;
  oldPrice?: number;
  category: string;
  brand?: string;
  tags?: string[];
  stock?: number;
  images?: string[] ;
  rating?: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}
