import { Account, BookSearchCondition, BooksPagination, Cart, CartService, Category, CategoryService } from "@book-shop/libs";
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { GaphAuth } from "../../common/guards/graph.guard";

@Resolver()
export class CartResolver {
  constructor(
    private readonly cartService: CartService)
     { }

  @UseGuards(GaphAuth)
  @Query(() => Cart)
  async getCart(@Context() context): Promise<Cart> {
    const { user } = context;

    return this.cartService.getCartByAccountId(user.sub);
  }
  @UseGuards(GaphAuth)
  @Mutation(() => Cart)
  async updateCart(
    @Context() context,
    @Args('bookId') bookId: string,
    @Args('quantity') quantity: number,
  ): Promise<Cart> {
    const { user } = context;

    return this.cartService.updateCart(user.sub, bookId, quantity);
  }
  @UseGuards(GaphAuth)
  @Mutation(() => Cart)
  async clearCart(@Context() context): Promise<Cart> {
    const { user } = context;
    return this.cartService.clearCart(user.sub);
  }

}
