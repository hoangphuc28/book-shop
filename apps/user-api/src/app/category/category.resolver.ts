import { BookSearchCondition, BooksPagination, Category, CategoryService } from "@book-shop/libs";
import { Resolver, Query, Args } from '@nestjs/graphql';


@Resolver()
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService
  ) { }
  @Query(() => [Category])
  async getCategories() {
    return  (await this.categoryService.find(true)).items
  }

}
