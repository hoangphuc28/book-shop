import { BookSearchCondition, BooksPagination, Category, CategoryService } from "@book-shop/libs";
import { Resolver, Query, Args } from '@nestjs/graphql';


@Resolver()
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService
  ) { }
  @Query(() => [Category])
  async getCategories() {
    const res = await this.categoryService.find(true)
    console.log(res)
    return res
  }

}
