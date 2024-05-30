import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Book } from './Book.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Category extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  categoryID: string;

  @Field(() => [Book])
  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  @Field()
  @Column()
  name: string;

  @Column()
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
