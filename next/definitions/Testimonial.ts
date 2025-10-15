export interface Testimonial {
  id: number;
  title: string;
  description: string;
  Image?: {
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
  ImageDark?: {
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
  locale?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
