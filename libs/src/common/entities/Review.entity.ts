import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Book } from './Book.entity';
import { User } from './User.entity';
import { Customer } from './Customer.entity';

@Entity()
export class Review extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  customers: Customer;

  @Column()
  rating: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
