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
  AfterUpdate,
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

  @Field({nullable: true})
  @Column({nullable: true})
  orderCode: string;

  @Field()
  @Column({nullable: true, default: 0})
  total: number

  @Field(() => OrderStatus)
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Field({nullable: true})
  @Column({nullable: true})
  deliveringDate: Date;

  @Field({nullable: true})
  @Column({nullable: true})
  deliveredDate: Date;

  @Field({nullable: true})
  @Column({nullable: true})
  cancelledDate: Date;

  @Field({nullable: true})
  @Column({nullable: true})
  cancelePendingDate: Date;

  @Field({nullable: true})
  @Column({nullable: true})
  note: string

  @Field({nullable: true})
  @Column({nullable: true})
  captureOrderId: string



  @AfterUpdate()
  updateStatusDate() {
    switch (this.status) {
      case OrderStatus.DELIVERING: {
        this.deliveringDate = new Date();
        this.save();
        break;
      }
      case OrderStatus.DELIVERED: {
        this.deliveredDate = new Date();
        this.save();
        break;
      }
      case OrderStatus.CANCELLED: {
        this.cancelledDate = new Date();
        this.save();
        break;
      }
      case OrderStatus.CANCEL_PENDING: {
        if(this.deliveredDate === null) {
          this.cancelePendingDate = new Date()
          this.save()
        }
        break;
      }
    }

  }

  @Field(() => PaymentMethod)
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.COD,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
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

  @Field(() => Promotion, {nullable: true})
  @ManyToOne(() => Promotion, (promotion) => promotion.orders)
  @JoinColumn({ name: 'promotionId' })
  promotion: Promotion;

  @Column({nullable: true})
  promotionId: string

  @Column({nullable: true})
  promotionValue: number

}
