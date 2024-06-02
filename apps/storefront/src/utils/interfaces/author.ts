import { Book } from "./book";


export interface Author {
  id: string;
  books: Book[];
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
