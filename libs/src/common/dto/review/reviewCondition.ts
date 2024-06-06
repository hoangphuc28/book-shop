import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class ListReviewCondition {

  @Field()
  limit: number;

  @Field()
  page: number


  @Field({ nullable: true })
  rating?: string;

  @Field({ nullable: true })
  sort: string

}
