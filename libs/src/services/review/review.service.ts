import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book, BookDetailReviews, Review } from '../../common';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { BookService } from '../book/book.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private accountService: AccountService,
    private productService: BookService,
    private configService: ConfigService,

  ) { }
  async createReview(accountId: string, productId: string, rating: number, content: string) {
    const account = await this.accountService.findUserById(accountId);
    if (!account)
        throw new Error('Can not find account');

    const product = await this.productService.findById(productId);
    if (!product)
        throw new Error('Can not find product');

    const review = new Review();
    review.rating = rating;
    review.content = content;
    review.accounts = account;
    review.book = product;

    const savedReview = await this.reviewRepository.save(review);

    await this.productService.calculateRating(product.id);
    return savedReview;
}
async getReviewByProduct(productId: string, limit: number, page: number) {
  const offset = (page - 1) * limit;

  // Fetch reviews with pagination
  const [reviews, total] = await this.reviewRepository.findAndCount({
    where: { bookId: productId },
    relations: ['accounts'],
    skip: offset,
    take: limit,
  });

  const bucketName = this.configService.get<string>('AWS.SERVICES.S3.BUCKET_NAME');
  for (let i = 0; i < reviews.length; i++) {
    reviews[i].accounts.avatar = `https://${bucketName}.s3.amazonaws.com/users/${reviews[i].accounts.id}.jpeg`;
  }


  // Optional: Return pagination metadata
  return {
    items: reviews,
    totalPages: Math.ceil(total / limit),
    totalItem: total,
    currentPage: page,
    itemsPerPage: limit
  }
}


}
