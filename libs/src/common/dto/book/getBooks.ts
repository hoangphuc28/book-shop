import { Field, ObjectType } from "@nestjs/graphql";
import { Book } from "../../entities";

@ObjectType()
export class BooksPagination {
  @Field(() => [Book])
  items: Book[]

  @Field()
  totalPage: number

  @Field()
  totalItem: number

  @Field()
  currentPage: number

  @Field()
  itemsPerPage: number
}
