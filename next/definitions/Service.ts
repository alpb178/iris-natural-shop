import { Category } from "./Category";

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  plans: any[];
  perks: any[];
  featured?: boolean;
  images: any[];
  image_dark?: any[];
  categories?: Category;
  currency?: string;
}
