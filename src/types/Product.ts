

export interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  category_id: string;
  variations: ProductVariation[];
  status: string;
}

export interface ProductVariation {
  size: string;
  color: string;
  price: number;
  sale_price: number;
  stock: number;
}

export interface ProductResponse
{
  data: Product;
  status: number;
  message: string;
}