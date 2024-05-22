import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';

@Entity()
export class Coupon extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column('decimal')
  discountPercent: number;

  @Column()
  discountValue: string

  @Column()
  startDate: Date;

  @Column()
  expireDate: Date;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.coupon)
  orderItems: OrderItem[];
}
