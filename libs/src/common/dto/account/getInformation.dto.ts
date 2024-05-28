import {ObjectType, Field} from "@nestjs/graphql"

@ObjectType()
export class GetAccountInformationDto {
  @Field()
  fullName: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  email: string;
}
