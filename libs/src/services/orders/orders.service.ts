import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderInput, CreateOrderReponse, Order, OrderItem, OrderStatus, PaginationResultDto, PaymentMethod } from '../../common';
import { Repository } from 'typeorm';
import { PromotionService } from '../promotion/promotion.service';
import { BookService } from '../book/book.service';
import { CartService } from '../cart/cart.service';
import { PaypalService } from '../paypal/paypal.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private promotionService: PromotionService,
    private productService: BookService,
    private cartService: CartService,
    private paypalSerivce: PaypalService

  ) { }

  async createOrder(createOrderInput: CreateOrderInput): Promise<CreateOrderReponse> {

    const queryRunner = this.orderRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      // create order
      const newOrder = new Order();
      Object.assign(newOrder, createOrderInput);
      newOrder.total = 0;

      let savedOrder = await queryRunner.manager.save(newOrder);

      for (const item of savedOrder.orderItems) {
        const product = await this.productService.findById(item.bookId);
        if (product?.price !== undefined) {
          savedOrder.total += (product.price - product.salePrice) * item.quantity;
        }
      }

      // apply promotion
      const { success, discount } = await this.promotionService.applyPromotion(savedOrder);
      if (success) {
        savedOrder.promotionValue = discount;
        savedOrder.total -= discount;
      }
      savedOrder = await queryRunner.manager.save(savedOrder);

      // create orderItems
      for (const item of savedOrder.orderItems) {
        const orderItem = new OrderItem();
        Object.assign(orderItem, item);
        const product = await this.productService.findById(orderItem.bookId);

        // calculate extend price
        if (product?.price !== undefined) {
          orderItem.price = product.price - product.salePrice;
          orderItem.extendPrice = (product.price - product.salePrice) * orderItem.quantity;
        } else {
          orderItem.extendPrice = 0;
        }
        orderItem.order = savedOrder;
        await queryRunner.manager.save(orderItem);
      }


      const res = new CreateOrderReponse();
      if (savedOrder.paymentMethod === PaymentMethod.Paypal) {
        const orderSavedTemp = await queryRunner.manager.findOne(Order, {
          where: { orderID: savedOrder.orderID },
          relations: ["orderItems.book", "promotion"]
        });
        if (orderSavedTemp) {
        console.log(orderSavedTemp)
          res.order = orderSavedTemp;
          createOrderInput.applicationContext.return_url = `${createOrderInput.applicationContext.return_url}?orderId=${orderSavedTemp.orderID}`;
          const orderDto = await this.paypalSerivce.convertOrderToOrderDto(orderSavedTemp, createOrderInput.applicationContext);
          const link = await this.paypalSerivce.createOrder(orderDto);
          if (link) res.link = link;
        }
      }


      await queryRunner.commitTransaction();
      return res;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }


  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderItems', 'promotion'],
    });
  }
  async find(page?: number, limit?: number, query = ''): Promise<PaginationResultDto<Order>> {
    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    // Include relations
    queryBuilder.leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('order.promotion', 'promotion');

    // Apply query filter if provided
    if (query) {
      queryBuilder
        .andWhere('LOWER(order.fullName) LIKE LOWER(:fullName)', { fullName: `%${query}%` })
        .orWhere('LOWER(order.phone) LIKE LOWER(:phone)', { phone: `%${query}%` })
        .orWhere('LOWER(order.email) LIKE LOWER(:email)', { email: `%${query}%` });
    }

    // Apply pagination if both page and limit are provided
    if (page !== undefined && limit !== undefined) {
      const offset = (page - 1) * limit;
      queryBuilder.offset(offset).limit(limit);
    }

    // Get the results and total count
    const [orders, total] = await queryBuilder.getManyAndCount();

    return new PaginationResultDto(orders, total, page, limit);
  }


  async findOrdersByAccountId(accountId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { account: { id: accountId } },
      relations: ['orderItems', 'promotion'],
    });
  }
  async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { orderID: id },
      relations: ['orderItems.book.category', 'orderItems.book.author', 'promotion'],
    })
  }
  async updateOrderStatus(id: string, status: OrderStatus) {
    try {
      const order = await this.findById(id);
      if (order) {
        order.status = status;
        await this.orderRepository.save(order);
        return order;
      }
    } catch (error) {
      throw new Error('Can not change order status')
    }
  }
}
