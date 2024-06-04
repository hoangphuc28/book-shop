import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { Review } from './Review.entity';
import { OrderItem } from './OrderItem.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from './Author.entity';
import { CartItem } from './CartItem.entity';

@ObjectType()
@Entity('books')
export class Book {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  cartItem: CartItem[];

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column()
  authorId: string;

  @Field({ nullable: true })
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({nullable: true})
  thumbnail: string;

  @Field({ nullable: true })
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column()
  price: number;

  @Field()
  @Column()
  publishDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 0 })
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
    Object.assign(this, partial);
  }
}
