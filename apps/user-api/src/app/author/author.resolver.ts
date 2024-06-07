import { Author, AuthorService, Category, CategoryService } from "@book-shop/libs";
import { Resolver, Query, Args } from '@nestjs/graphql';


@Resolver()
export class AuthorResolver {
  constructor(
    private authorService: AuthorService
  ) { }
  @Query(() => [Author])
  async getAuthors() {
    return (await this.authorService.find(true)).items
  }

}
