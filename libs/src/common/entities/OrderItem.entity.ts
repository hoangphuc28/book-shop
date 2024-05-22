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
import { Coupon } from './Coupon.entity';
import { Order } from './Order.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  orderItemID: string;

  @ManyToOne(() => Book, (book) => book.orderItems)
  book: Book;

  @ManyToOne(() => Coupon, (coupon) => coupon.orderItems, { nullable: true })
  coupon: Coupon;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Column()
  quantity: number;

  @Column('decimal')
  totalItemPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
