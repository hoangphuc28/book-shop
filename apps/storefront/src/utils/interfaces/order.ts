import { InputType, Field } from '@nestjs/graphql';
import { PaymentMethod } from './enum';
import { Book } from './book';

export interface CreateOrderInput {
  fullName?: string;

  address?: string;

  phone?: string;

  email?: string;

  paymentMethod?: PaymentMethod;

  accountId?: string;

  orderItems?: OrderItemInput[];

  promotionId?: string;
}

export interface OrderItemInput {
  orderItemID?: string;

  bookId: string;

  orderId?: string;

  quantity?: number;

  totalItemPrice?: number;


}
