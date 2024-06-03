import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class BookSearchCondition {
  @Field({ nullable: true, defaultValue: '' })
  query?: string;
  @Field({ nullable: true })
  rating?: string;

  @Field({ nullable: true })
  sort: string

  @Field(() => [String], { nullable: true }) // Define the type as an array of strings
  category?: string[];

  @Field(() => [String], { nullable: true }) // Define the type as an array of strings
  author?: string[];
}
