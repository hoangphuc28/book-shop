import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderInput, CreateOrderReponse, Order, OrderItem, OrderStatus, PaginationResultDto, PaymentMethod, PaymentStatus } from '../../common';
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
      newOrder.orderCode = await this.generateOrderID()
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
      res.order = savedOrder
      if (savedOrder.paymentMethod === PaymentMethod.PAYPAL) {

        const orderSavedTemp = await queryRunner.manager.findOne(Order, {
          where: { orderID: savedOrder.orderID },
          relations: ["orderItems.book", "promotion"]
        });
        if (orderSavedTemp) {
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

  async find(page?: number, limit?: number, query = '', status = OrderStatus.DELIVERING): Promise<PaginationResultDto<Order>> {
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
    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    // Apply pagination if both page and limit are provided
    if (page !== undefined && limit !== undefined) {
      const offset = (page - 1) * limit;
      queryBuilder.offset(offset).limit(limit);
    }
    queryBuilder.orderBy('order.createdAt', 'ASC');

    // Get the results and total count
    const [orders, total] = await queryBuilder.getManyAndCount();

    return new PaginationResultDto(orders, total, page, limit);
  }


  async findOrdersByAccountId(accountId: string, status?: OrderStatus): Promise<Order[]> {
    return this.orderRepository.find({
      where: { account: { id: accountId } },
      relations: ['orderItems.book', 'promotion'],
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
      console.log(order?.status)
      if (order) {
        order.status = status;
        console.log(order.status)
        if((order.status === OrderStatus.CANCELLED || order.status === OrderStatus.REJECTED) && order.paymentStatus === PaymentStatus.PAID) {
          await this.paypalSerivce.refund(order.captureOrderId, order)
          order.paymentStatus = PaymentStatus.REFUNDED
        }
        if(order.status === OrderStatus.DELIVERED) {
          order.paymentStatus = PaymentStatus.PAID
        }
        await this.orderRepository.save(order);
        return order;
      }
    } catch (error) {
      console.log(error)
      throw new Error('Can not change order status')
    }
  }
  async updatePaymentStatus(id: string, status: PaymentStatus) {
    try {
      const order = await this.findById(id);
      if (order) {
        order.paymentStatus = status;
        await this.orderRepository.save(order);
        return order;
      }
    } catch (error) {
      throw new Error('Can not change order status')
    }
  }
  async generateOrderID(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Lấy 2 chữ số cuối của năm
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Tháng (01-12)
    const day = now.getDate().toString().padStart(2, '0'); // Ngày (01-31)
    const hours = now.getHours().toString().padStart(2, '0'); // Giờ (00-23)
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Phút (00-59)
    const seconds = now.getSeconds().toString().padStart(2, '0'); // Giây (00-59)
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0'); // Milliseconds (000-999)

    return `ORD-${year}${month}${day}-${hours}${minutes}${seconds}${milliseconds}`;
  }
  async updateOrderCaptureId(id: string, orderCaptureId: string) {
    this.orderRepository.save({orderID: id, captureOrderId: orderCaptureId})
  }
}
