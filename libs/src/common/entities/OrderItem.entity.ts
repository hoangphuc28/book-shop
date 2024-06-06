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
import { Order } from './Order.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  orderItemID: string;

  @ManyToOne(() => Book, (book) => book.orderItems, { cascade: true })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Field()
  @Column()
  bookId: string;

  @Field({nullable: true})
  @Column({nullable: true})
  extendPrice: number

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'orderID' })
  order: Order;

  @Field()
  @Column({nullable: true})
  orderID: string;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

}
