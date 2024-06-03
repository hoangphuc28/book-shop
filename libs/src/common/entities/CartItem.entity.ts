import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Book } from './Book.entity';
import { Cart } from './Cart.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.cartItem)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column()
  bookId: string;

  @Field(() => Cart)
  @ManyToOne(() => Cart, (cart) => cart.cartItem)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column()
  cartId: string;

  @Field()
  @Column()
  quantity: number;

  constructor(partial: Partial<CartItem>) {
    super();
    Object.assign(this, partial);
  }
}
