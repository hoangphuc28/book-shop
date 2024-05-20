import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { OrderItem } from './OrderItem.entity';
import { PaymentMethod } from './PaymentMethod.entity'; // Import PaymentMethod entity

enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderID: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.orders) // Change to PaymentMethod
  paymentMethod: PaymentMethod; // Change to PaymentMethod

  @Column()
  recipientName: string;

  @Column()
  recipientAddress: string;

  @Column()
  recipientPhone: string;

  @Column()
  totalPrice: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
