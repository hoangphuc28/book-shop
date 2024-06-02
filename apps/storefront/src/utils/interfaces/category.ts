import { Book } from "./book";
export interface Category {
  categoryID: string;
  books: Book[];
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
