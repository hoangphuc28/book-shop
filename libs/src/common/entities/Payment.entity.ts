import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { Admin } from './Admin.entity';
import { PaymentMethod } from '../constants';
import { Order } from './Order.entity';

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.Cod })
  paymentMethod: PaymentMethod

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;
}
