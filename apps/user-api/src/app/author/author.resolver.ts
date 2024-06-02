import { Author, AuthorService, Category, CategoryService } from "@book-shop/libs";
import { Resolver, Query, Args } from '@nestjs/graphql';


@Resolver()
export class AuthorResolver {
  constructor(
    private authorService: AuthorService
  ) { }
  @Query(() => [Author])
  async getAuthors() {
    const res = await this.authorService.find(true)
    console.log(res)
    return res
  }

}
