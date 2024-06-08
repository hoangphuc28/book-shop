import { CreateOrderInput, CreateOrderReponse, Order, OrderDto, OrderStatus, OrdersService, PaymentMethod, PaypalService } from '@book-shop/libs';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { GaphAuth } from '../../common/guards/graph.guard';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrdersService,
    private paypalSerivce: PaypalService
  ) { }
  @UseGuards(GaphAuth)
  @Mutation(() => CreateOrderReponse)
  async createOrder(@Context() context, @Args('order') orderCreateInput: CreateOrderInput): Promise<CreateOrderReponse> {
    const { user } = context;
    orderCreateInput.accountId = user.sub
    const res = await this.orderService.createOrder(orderCreateInput);

    return res
  }
  @UseGuards(GaphAuth)
  @Query(() => [Order], { name: 'orders' })
  async findAllOrders(): Promise<Order[]> {
    return this.orderService.findAllOrders();
  }
  @UseGuards(GaphAuth)
  @Query(() => [Order], { name: 'ordersByAccount' })
  async findOrdersByAccountId(@Args('accountId') accountId: string): Promise<Order[]> {
    return this.orderService.findOrdersByAccountId(accountId);
  }

  @Mutation(() => String)
  async captureOrder(
    @Args('token') token: string) {
      return this.paypalSerivce.captureOrder(token)
    }
}
