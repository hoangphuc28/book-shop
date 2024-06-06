import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../constants';
import { Account } from './Account.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Promotion } from './Promotion.entity';

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'The status of order',
});

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
  description: 'The payment method of order',
});

@ObjectType()
@Entity()
export class Order extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  orderID: string;

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

  @Field()
  @Column({nullable: true, default: 0})
  total: number

  @Field(() => OrderStatus)
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Order_Placed,
  })
  status: OrderStatus;

  @Field(() => PaymentMethod)
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.Cod,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  paymentStatus: PaymentStatus;


  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToOne(() => Account, (account) => account.order)
  @JoinColumn({ name: 'accountId' })
  account: Account;
  @Column()
  accountId: string;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Field(() => Promotion)
  @ManyToOne(() => Promotion, (promotion) => promotion.orders)
  @JoinColumn({ name: 'promotionId' })
  promotion: Promotion;

  @Column({nullable: true})
  promotionId: string

  @Column({nullable: true})
  promotionValue: number

}
