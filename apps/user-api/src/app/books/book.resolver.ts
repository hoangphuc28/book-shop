import {
  Book,
  BookDetail,
  BookDetailReviews,
  BookSearchCondition,
  BookService,
  BooksPagination,
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
  @Query(() => BookDetail)
  async getBook(
    @Args('id') id: string,
    @Args('limit', { defaultValue: 5 }) limit?: number,
    @Args('page', { defaultValue: 1 }) page?: number,
  ) {
    const book = await this.bookService.findById(id);
    const paginatedReviews = await this.reviewService.getReviewByProduct(book.id, limit, page);
    const res = new BookDetail()
    res.book = book
    res.reviews  = paginatedReviews
    return res
  }
  @Query(() => [Book])
  async getBookOnSale() {
    const res = await this.bookService.getBooksOneSale();
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
