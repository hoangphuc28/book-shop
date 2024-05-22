import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { User } from './User.entity';
import { OrderItem } from './OrderItem.entity';
import { OrderStatus } from '../constants';
import { Payment } from './Payment.entity';
import { Customer } from './Customer.entity';



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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @OneToOne(() => Customer, (customer) => customer.order)
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
