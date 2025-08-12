import { Category } from "./Category";
import { Image } from "./Image";

export interface Article {
  title: string;
  description: string;
  slug: string;
  content: string;
  dynamic_zone: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: Image;
  categories: Category[];
}
