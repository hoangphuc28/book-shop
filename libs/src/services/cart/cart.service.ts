import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // ! Don't forget this import
import { BadGatewayException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Account, Book, Cart, CartItem } from '../../common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private accountService: AccountService,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

  ) { }

  async initital(user: Account) {
    try {
      const cart = new Cart({})
      cart.account = user
      return this.cartRepository.save(cart)
    } catch (error) {
      throw Error('Internal server error')
    }
  }
  async getCartByAccountId(accountId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { accountId: accountId },
      relations: ['cartItem', 'cartItem.book', 'cartItem.book.author'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart not found for account ID: ${accountId}`);
    }
    cart.cartItem =  cart.cartItem.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return cart;
  }

  async updateCart(accountId: string, bookId: string, quantity: number, isReplace: boolean): Promise<Cart> {
    const cart = await this.getCartByAccountId(accountId);

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book not found for ID: ${bookId}`);
    }

    let cartItem = cart.cartItem.find(item => item.bookId === bookId);
    if (cartItem) {
      switch (isReplace) {
        case true:
        cartItem.quantity = quantity
        if (cartItem.quantity <= 0) {
          await this.cartItemRepository.remove(cartItem);
          cart.cartItem = cart.cartItem.filter(item => item.id !== cartItem?.id);
        } else {
          await this.cartItemRepository.save(cartItem);
        }
        break;
        case false:
        cartItem.quantity += quantity;
        if (cartItem.quantity <= 0) {
          await this.cartItemRepository.remove(cartItem);
          cart.cartItem = cart.cartItem.filter(item => item.id !== cartItem?.id);
        } else {
          await this.cartItemRepository.save(cartItem);
        }
        break;
      }
    } else {
      if (quantity > 0) {
        cartItem = this.cartItemRepository.create({ cart, book, quantity });
        await this.cartItemRepository.save(cartItem);
        cart.cartItem.push(cartItem);
      }
    }

    cart.amount = this.calculateTotalAmount(cart);
    await this.cartRepository.save(cart);
    return cart;
  }

  async clearCart(accountId: string): Promise<Cart> {
    const cart = await this.getCartByAccountId(accountId);
    await this.cartItemRepository.remove(cart.cartItem);
    cart.cartItem = [];
    cart.amount = 0;
    await this.cartRepository.save(cart);
    return cart;
  }

  private calculateTotalAmount(cart: Cart): number {
    return cart.cartItem.reduce((total, item) => total + (item.book.price-item.book.salePrice) * item.quantity, 0);
  }

}
