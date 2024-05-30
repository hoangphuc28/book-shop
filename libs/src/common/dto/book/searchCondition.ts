import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class BookSearchCondition {
  @Field({ nullable: true })
  searchTitle?: string;

  @Field({ nullable: true })
  category?: string;
}
