import { ObjectType, Field, ID } from '@nestjs/graphql';
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
import { Cart } from './Cart.entity';

@ObjectType()
@Entity()
export class Account extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Field()
  avatar: string;


  @Column({nullable: true})
  @Exclude()
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable: true})
  @Exclude()
  refreshToken: string;

  @OneToMany(() => Order, (order) => order.account)
  order: Order[];

  @OneToOne(() => Cart, (cart) => cart.account )
  cart: Cart


  @OneToMany(() => Review, (review) => review.accounts)
  reviews: Review[];

  constructor(partial: Partial<Account>) {
    super()
    Object.assign(this, partial)
  }
}
