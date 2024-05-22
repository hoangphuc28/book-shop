import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { Order } from './Order.entity';
import { Review } from './Review.entity';
import { User } from './User.entity';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.customers)
  user: User;

  @OneToOne(() => Order, (order) => order.customer)
  order: Order;

  @OneToMany(() => Review, (review) => review.customers)
  reviews: Review[];
}
