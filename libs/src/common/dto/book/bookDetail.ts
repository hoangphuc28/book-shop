import { ObjectType, Field } from "@nestjs/graphql"
import { Book, Review } from "../../entities"

@ObjectType()
export class BookDetailReviews {
  @Field(() => [Review])
  items: Review[]

  @Field()
  totalPages: number

  @Field()
  totalItem: number

  @Field()
  currentPage: number

  @Field()
  itemsPerPage: number
}
@ObjectType()
export class BookDetail {
  @Field(() => Book)
  book: Book

  @Field(() => BookDetailReviews)
  reviews: BookDetailReviews


}

