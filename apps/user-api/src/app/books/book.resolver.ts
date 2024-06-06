import {
  Book,
  BookSearchCondition,
  BookService,
  BooksPagination,
  CreateOrderInput,
  CreateReviewInput,
  Review,
  ReviewService,
} from '@book-shop/libs';
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { GaphAuth } from '../../common/guards/graph.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class BookResolver {
  constructor(
    private bookService: BookService,
    private reviewService: ReviewService
  ) {}
  @Query(() => BooksPagination)
  async getBooks(
    @Args('limit') limit: number,
    @Args('page') page: number,
    @Args('condition', { nullable: true }) condition?: BookSearchCondition
  ) {
    const res = await this.bookService.find(limit, page, true, condition);
    return res;
  }

  @Query(() => Book)
  async getBook(@Args('id') id: string) {
    const res = await this.bookService.findById(id);
    return res;
  }

  @UseGuards(GaphAuth)
  @Mutation(() => Review)
  async createReview(
    @Context() context,
    @Args('productId') productId: string,
    @Args('rating') rating: number,
    @Args('content') content: string
  ) {
    const { user } = context;
    const res = await this.reviewService.createReview(user.sub, productId, rating, content);
    return res
  }
}
