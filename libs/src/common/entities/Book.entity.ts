import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { Review } from './Review.entity';
import { OrderItem } from './OrderItem.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from './Author.entity';

@ObjectType()
@Entity('books')
export class Book {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: string;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column()
  authorId: string;

  @Field()
  @Column()
  title: string;

  @Field()
  thumbnail: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  publishDate: Date;

  @Field()
  @Column('decimal', {nullable: true})
  rating: number;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  orderItems: OrderItem[];
  constructor(partial: Partial<Book>) {
    Object.assign(this, partial)
  }
}
