import { InputType, Field } from '@nestjs/graphql';
import { OrderStatus, PaymentMethod, PaymentStatus } from './enum';
import { Book } from './book';
import { Promotion } from './promotion';

export interface CreateOrderInput {
  fullName?: string;

  address?: string;

  phone?: string;

  email?: string;

  paymentMethod?: PaymentMethod;

  accountId?: string;

  orderItems?: OrderItemInput[];

  promotionId?: string;

  applicationContext?: ApplicationContext
}

export interface ApplicationContext {
  return_url: string;

  cancel_url: string;
}

export interface OrderItemInput {
  orderItemID?: string;

  bookId: string;

  orderId?: string;

  quantity?: number;

  totalItemPrice?: number;

}

export interface Order {
  orderID: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  total?: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
  orderCode: string;
  promotion?: Promotion;
  promotionId?: string;
  promotionValue?: number;

  deliveringDate: Date;

  deliveredDate: Date;

  cancelledDate: Date;

  cancelePendingDate: Date;
}
export interface OrderItem {
  orderItemID: string;
  book: Book;
  bookId: string;
  extendPrice?: number;
  order: Order;
  orderID?: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
