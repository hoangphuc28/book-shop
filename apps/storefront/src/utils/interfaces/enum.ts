export enum PaymentMethod {
  COD = 'COD',
  PAYPAL = 'PAYPAL',
}
export enum OrderStatus {
  PENDING = 'PENDING',// the order is registered in the merchant's system
  DELIVERING = 'DELIVERING', // the package are moved
  DELIVERED = 'DELIVERED', // the customer's address has successfully received the package
  CANCELLED = 'CANCELLED', // stock issues or payment problems
  CANCEL_PENDING = 'CANCEL_PENDING',
  REJECTED = 'REJECTED'
}
export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED'
}
export enum PromotionLevel {
  Level_Order = 'ORDER_LEVEL',
  Level_Product = 'PRODUCT_LEVEL'
}
