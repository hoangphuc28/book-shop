import { InputType, Field } from '@nestjs/graphql';
import { PaymentMethod } from '../../constants';

@InputType()
export class CreateOrderInput {
  @Field({nullable: true})
  fullName: string;

  @Field({nullable: true})

  address: string;

  @Field({nullable: true})

  phone: string;

  @Field({nullable: true})
  email: string;

  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field({nullable: true})

  accountId: string;

  @Field(() => [OrderItemInput])
  orderItems: OrderItemInput[]

  @Field({nullable: true})
  promotionId: string
}
@InputType()
export class OrderItemInput {
  @Field({nullable: true})

  orderItemID: string;

  @Field({nullable: true})

  bookId: string;

  @Field({nullable: true})

  orderId: string;

  @Field({nullable: true})

  quantity: number;
}
