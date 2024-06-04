import { Book } from "./book";

export interface CartItems {
  book: Book
  quantity: number
}
export interface Cart {
  cartItems: CartItems[]
}
