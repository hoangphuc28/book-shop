import { Account, GetAccountInformationDto } from '@book-shop/libs';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { GaphAuth } from '../../common/guards/graph.guard';
import { AccountService } from '@book-shop/libs';


@Resolver()
export class AccountResolver {
  constructor(
    private readonly accountService: AccountService)
     { }
  @UseGuards(GaphAuth)
  @Query(() => GetAccountInformationDto)
  async information(@Context() context) {
    const { user } = context;
    return this.accountService.findUserById(user.sub);
  }
  @UseGuards(GaphAuth)
  @Mutation(returns => Account)
  async saveAccount(@Context() context,
    @Args('fullName', {nullable: true}) fullName: string,
    @Args('phone') phone: string,
    @Args('address') address: string,
  ) {
    const { user } = context;
    await this.accountService.update(user.sub, {fullName, phone, address});
    return this.accountService.findUserById(user.sub)
  }

}
