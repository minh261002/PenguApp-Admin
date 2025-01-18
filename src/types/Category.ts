export interface Category{
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  show_menu: boolean;
  show_home: boolean;
  status: string;
}

export interface CategoryResponse {
  data: Category;
  status: number;
  message: string;
}
