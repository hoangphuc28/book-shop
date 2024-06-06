import {  CreateOrderInput, Order, OrdersService } from '@book-shop/libs';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { GaphAuth } from '../../common/guards/graph.guard';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrdersService) {}
  @UseGuards(GaphAuth)

  @Mutation(() => Order)
  async createOrder(@Context() context, @Args('order') order: CreateOrderInput): Promise<Order> {
    const { user } = context;
    order.accountId = user.sub
    return this.orderService.createOrder(order);
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
}
