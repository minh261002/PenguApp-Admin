export interface Post{
  _id: string;
  title: string;
  category_id: string;
  slug: string;
  image: string;
  content: string;
  is_featured: boolean;
  status: string;
}

export interface PostResponse {
  data: Post;
  status: number;
  message: string;
}
