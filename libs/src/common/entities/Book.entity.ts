import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category.entity.js';
import { Review } from './Review.entity.js';
import { OrderItem } from './OrderItem.entity.js';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  isActive: boolean;

  @Column()
  publishDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  orderItems: OrderItem[];
}
