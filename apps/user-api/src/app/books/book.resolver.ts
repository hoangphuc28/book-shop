import { BookSearchCondition, BookService, BooksPagination } from "@book-shop/libs";
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';


@Resolver()
export class BookResolver {
  constructor(
    private bookService: BookService
  ) { }
  @Query(() => BooksPagination)
  async getBooks(
    @Args('limit') limit: number,
    @Args('page') page: number,
    @Args('condition', { nullable: true }) condition?: BookSearchCondition
  ) {
    const res = await this.bookService.find(limit, page, false, condition)
    console.log(res)
    return res
  }

}
