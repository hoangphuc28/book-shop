import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Category } from './Category.entity';
import { Review } from './Review.entity';
import { OrderItem } from './OrderItem.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('books')
export class Book {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

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
  price: string;

  @Field()
  @Column({nullable: true})
  author: string

  @Field()
  @Column()
  packingDemestration: string;

  @Field()
  @Column()
  weight: string;

  @Field()
  @Column()
  pageCount: number;

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
}
