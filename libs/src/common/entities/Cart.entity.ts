import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BaseEntity,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Account } from './Account.entity';
import { CartItem } from './CartItem.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Cart extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Account)
  @OneToOne(() => Account, (account) => account.cart)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Field()
  @Column()
  accountId: string;

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItem: CartItem[];

  @Column({nullable: true, default: 0})
  amount: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Cart>) {
    super();
    Object.assign(this, partial);
  }
}
