import { Account } from "./account";
import { Book } from "./book";

export interface Review {
  id: string;
  book: Book;
  accounts: Account;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;

}
export interface BookDetailReviews {
  items: Review[]

  totalPages: number

  totalItem: number

  currentPage: number

  itemsPerPage: number
}
