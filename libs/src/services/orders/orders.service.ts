import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderInput, Order, OrderItem } from '../../common';
import { Repository } from 'typeorm';
import { PromotionService } from '../promotion/promotion.service';
import { BookService } from '../book/book.service';
import { CartService } from '../cart/cart.service';

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
  ) { }

  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    //create order
    const newOrder = new Order();
    Object.assign(newOrder, createOrderInput);
    newOrder.total = 0;

    let savedOrder = await this.orderRepository.save(newOrder);
    for (const item of savedOrder.orderItems) {
      const product = await this.productService.findById(item.bookId);
      if (product?.price !== undefined) {
        savedOrder.total += product.price * item.quantity;
      }
    }
    //apply promotion
    const { success, discount } = await this.promotionService.applyPromotion(savedOrder);
    if (success) {
      savedOrder.promotionValue = discount;
      savedOrder.total -= discount;
    }
    savedOrder = await this.orderRepository.save(savedOrder);
    // create orderItems
    for (const item of savedOrder.orderItems) {
      const orderItem = new OrderItem();
      Object.assign(orderItem, item);
      const product = await this.productService.findById(orderItem.bookId);

      //calculate extend price
      if (product?.price !== undefined) {
        orderItem.extendPrice = product.price * orderItem.quantity;
      } else {
        orderItem.extendPrice = 0;
      }
      orderItem.order = savedOrder;
      await this.orderItemRepository.save(orderItem);
    }


    return (savedOrder);
  }


  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderItems', 'promotion'],
    });
  }

  async findOrdersByAccountId(accountId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { account: { id: accountId } },
      relations: ['orderItems', 'promotion'],
    });
  }
}
