export interface PostCatalogue{
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  show_menu: boolean;
  show_home: boolean;
  parent: string;
  status: string;
}

export interface PostCatalogueResponse {
  data: PostCatalogue;
  status: number;
  message: string;
}
