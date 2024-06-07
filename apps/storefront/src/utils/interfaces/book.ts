import { Author } from "./author";
import { Category } from "./category";
import { Review } from "./review";

export interface Book {
  id: string;
  category: Category;
  categoryId: string;
  author: Author;
  authorId: string;
  title: string;
  thumbnail: string;
  description: string;
  price: string;
  salePrice: number;
  publishDate: Date;
  rating?: number;  // rating is nullable
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  reviews: Review[];
}
