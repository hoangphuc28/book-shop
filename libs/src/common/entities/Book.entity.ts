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

@Entity('books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  packingDemestration: string;

  @Column()
  weight: string;

  @Column()
  pageCount: number;

  @Column()
  publishDate: Date;

  @Column('decimal')
  rating: number;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  orderItems: OrderItem[];
}
