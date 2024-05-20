import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './Book.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryID: number;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
