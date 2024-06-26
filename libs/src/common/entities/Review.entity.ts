import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Book } from './Book.entity';
import { Account } from './Account.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Review extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.reviews)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column()
  bookId: string;

  @Field(() => Account)
  @ManyToOne(() => Account, (account) => account.reviews)
  accounts: Account;

  @Field()
  @Column({nullable: true, default: false})
  isActive: boolean;

  @Field()
  @Column()
  rating: number;

  @Field()
  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
