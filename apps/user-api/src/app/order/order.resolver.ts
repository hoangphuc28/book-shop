import { CreateOrderInput, CreateOrderReponse, Order, OrderDto, OrderStatus, OrdersService, PaymentMethod, PaymentStatus, PaypalService } from '@book-shop/libs';
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
  @Query(() => [Order])
  async findOrdersByAccountId(@Context() context,
  @Args('status') status: string
): Promise<Order[]> {
  console.log(status)
    const { user } = context;

    return this.orderService.findOrdersByAccountId(user.sub);
  }
  @UseGuards(GaphAuth)
  @Query(() => Order)
  async getDetailOrder(
  @Args('orderId') orderId: string) {
    return this.orderService.findById(orderId)
  }

  @Mutation(() => String)
  async captureOrder(
    @Args('token') token: string,
    @Args('orderId') orderId: string
  ) {
      const res = await this.paypalSerivce.captureOrder(token)
      if(res) {
        console.log(res)
        await this.orderService.updatePaymentStatus(orderId, PaymentStatus.PAID)
        await this.orderService.updateOrderCaptureId(orderId, res)

      }
      return 'success'
    }
  @Mutation(() => String)
  async updateOrderStatus(
    @Args('orderId') orderId: string,
    @Args('orderStatus') orderStatus: string
  ) {
    const status =  OrderStatus[orderStatus as keyof typeof OrderStatus];
    console.log(status)
    this.orderService.updateOrderStatus(orderId, status)
      return 'success'
  }
}
