import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { OrderStatus, PaymentStatus } from '../constants';
import { Account } from './Account.entity';




@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  orderID: string;

  @Column()
  orderCode: string;

  @Column()
  totalPrice: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Order_Placed,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  paymentStatus: PaymentStatus;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @OneToOne(() => Account, (account) => account.order)
  account: Account;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
