

export interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  category_id: string;
  variants: ProductVariant[];
  status: string;
}

interface ProductVariant {
  _id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  sale_price: number;
  stock: number;
  status: string;
}

export interface ProductResponse
{
  data: Product;
  status: number;
  message: string;
}