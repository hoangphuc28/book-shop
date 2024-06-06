import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from '../../common/dto/review/reviewInput';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'aws-sdk';
import { Review } from '../../common';
import { Repository } from 'typeorm';
import { ResourceService } from '../resource/resource.service';
import { AccountService } from '../account/account.service';
import { BookService } from '../book/book.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private accountService: AccountService,
    private productService: BookService
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

}
