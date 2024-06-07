import { AboutService } from '@book-shop/libs';
import { Resolver, Query } from '@nestjs/graphql';


@Resolver()
export class AboutPageResolver {
  constructor(
    private readonly aboutService: AboutService)
     { }
  @Query(() => String)
  async getAboutPage() {
    return (await this.aboutService.getAboutPage()).content
  }

}
