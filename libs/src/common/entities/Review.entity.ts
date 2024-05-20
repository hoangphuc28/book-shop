import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './Book.entity';
import { User } from './User.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewID: number;

  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Column()
  rating: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
