import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { Order } from './Order.entity';
import { Review } from './Review.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({nullable: true})
  @Exclude()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable: true})
  @Exclude()
  refreshToken: string;

  @OneToOne(() => Order, (order) => order.account)
  order: Order;

  @OneToMany(() => Review, (review) => review.accounts)
  reviews: Review[];

  constructor(partial: Partial<Account>) {
    super()
    Object.assign(this, partial)
  }
}
