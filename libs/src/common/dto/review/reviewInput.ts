import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateReviewInput {
  @Field({ nullable: true, defaultValue: 0 })
  rating?: number;
  @Field({ nullable: true, defaultValue: '' })
  content?: string;
  @Field()
  productId: string
}
