import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class BookSearchCondition {
  @Field({ nullable: true })
  searchTitle?: string;

  @Field(() => [String], { nullable: true }) // Define the type as an array of strings
  category?: string[];

  @Field(() => [String], { nullable: true }) // Define the type as an array of strings
  author?: string[];
}
