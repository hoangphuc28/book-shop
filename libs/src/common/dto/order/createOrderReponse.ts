import { Field, ObjectType } from "@nestjs/graphql";
import { Order } from "../../entities";

@ObjectType()
export class CreateOrderReponse {
  @Field(() => Order)
  order: Order

  @Field({nullable: true})
  link: string
}

