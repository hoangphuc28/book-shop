import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Amount, ApplicationContext, Item, Order, OrderDto, OrderIntent, OrderRefund, OrderResponse, PurchaseUnit } from '../../common';
import axios from 'axios';
@Injectable()
export class PaypalService {
  private readonly clientId: string;
  private readonly secretKey: string;
  private readonly baseUrl: string;
  private readonly createOrderApi: string;
  private readonly captureOrderApi: string;
  private readonly payoutApi: string;
  private readonly getAccessTokenApi: string;
  private readonly identifyApi: string;
  private readonly refundApi: string;
  constructor(
    private configService: ConfigService
  ) {
    this.clientId = this.configService.get<string>('PAYPAL.ClientId') || '';
    this.secretKey = this.configService.get<string>('PAYPAL.SecretKey') || '';
    this.baseUrl = this.configService.get<string>('PAYPAL.BaseUrl') || '';
    this.createOrderApi = this.configService.get<string>('PAYPAL.CreateOrderApi') || '';
    this.captureOrderApi = this.configService.get<string>('PAYPAL.CaptureOrderApi') || '';
    this.payoutApi = this.configService.get<string>('PAYPAL.PayoutApi' || '') || '';
    this.getAccessTokenApi = this.configService.get<string>('PAYPAL.GetAccessToken') || '';
    this.identifyApi = this.configService.get<string>('PAYPAL.IdentifyApi') || '';
    this.refundApi = this.configService.get<string>('PAYPAL.RefundApi') || '';
    this.validateConfig();
  }

  async getAccessToken(): Promise<string> {
    const url = `${this.baseUrl}${this.getAccessTokenApi}`;
    const auth = Buffer.from(`${this.clientId}:${this.secretKey}`).toString('base64');
    try {
      const response = await axios.post(
        url,
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const { access_token } = response.data;
      return access_token;
    } catch (error: any) {
      console.error('Error fetching PayPal access token:', error.response?.data || error.message);
      throw new Error('Failed to fetch PayPal access token');
    }
  }
  async createOrder(orderDto: OrderDto) {
    try {
      const accessToken = await this.getAccessToken();

      const res = await axios({
        url: `${this.baseUrl}${this.createOrderApi}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      },
        data: JSON.stringify(orderDto)
      })
      const data = res.data as OrderResponse
      const link = data.links.find(link => link.rel === 'approve')?.href;
      return link
    } catch (error) {
      console.log(error)
      throw new Error('Error payment')
    }
  }
  async captureOrder(token: string) {
    try {
      const captureOrderUrl = `${this.baseUrl}${this.captureOrderApi.replace('%s', token)}`;
      const accessToken = await this.getAccessToken();
      const res = await axios({
        url: captureOrderUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      },
      })
      const captureOrderId = res.data?.purchase_units[0]?.payments?.captures[0]?.id

      return captureOrderId
    } catch (error) {
      console.log(error)
      return 'fail'
    }
  }
  async refund(orderCaptureId: string, order: Order) {
    try {
      const captureOrderUrl = `${this.baseUrl}${this.refundApi.replace('%s', orderCaptureId)}`;
      const accessToken = await this.getAccessToken();
      const data = new OrderRefund()
      const amount = new Amount()
      amount.value = this.convertVNDToUSD(order.total+order.promotionValue).toString()
      amount.currency_code = 'USD'
      data.amount = amount
      data.invoice_id = Date.now().toString()
      data.note_to_payer = 'Defective product'
      const res = await axios({
        url: captureOrderUrl,
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      },
      })
      return 'success'
    } catch (error) {
      console.log(error)
      return 'fail'
    }
  }


  private validateConfig() {
    if (!this.clientId) throw new Error('PayPal ClientId is not defined');
    if (!this.secretKey) throw new Error('PayPal SecretKey is not defined');
    if (!this.baseUrl) throw new Error('PayPal BaseUrl is not defined');
    if (!this.createOrderApi) throw new Error('PayPal CreateOrderApi is not defined');
    if (!this.captureOrderApi) throw new Error('PayPal CaptureOrderApi is not defined');
    if (!this.payoutApi) throw new Error('PayPal PayoutApi is not defined');
    if (!this.getAccessTokenApi) throw new Error('PayPal GetAccessToken is not defined');
    if (!this.identifyApi) throw new Error('PayPal IdentifyApi is not defined');
  }

  async convertOrderToOrderDto(order: Order, context: ApplicationContext): Promise<OrderDto> {
    const items: Item[] = order.orderItems.map(orderItem => {
      return {
        name: orderItem.book.title,
        description: orderItem.book.authorId,
        quantity: orderItem.quantity.toString(),
        unit_amount: {
          currency_code: 'USD', // Assume currency code is USD for all items
          value: this.convertVNDToUSD( orderItem.price).toString(),
        },
      };
    });

    const purchaseUnit: PurchaseUnit = {
      items: items,
      amount: {
        currency_code: 'USD', // Assume currency code is USD for the order
        value: this.convertVNDToUSD(order.total+order.promotionValue).toString(),
        breakdown: {
          item_total: {
            currency_code: 'USD', // Assume currency code is USD for item total
            value: this.convertVNDToUSD(order.total+order.promotionValue).toString(),
          },
        },
      },
    };

    const applicationContext: ApplicationContext = {
      return_url: context?.return_url,
      cancel_url: context?.cancel_url,
    };

    const orderDto: OrderDto = {
      intent: OrderIntent.INITIAL, // Map OrderStatus to OrderIntent if necessary
      purchase_units: [purchaseUnit],
      application_context: applicationContext,
    };

    return orderDto;
  }

  convertVNDToUSD(vnd: number, conversionRate = 0.000043): number {
    return Math.round(vnd*conversionRate* 100) /100;
  }

}
