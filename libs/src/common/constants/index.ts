export enum PaymentMethod {
  Cod = 'COD',
  Paypal = 'PAYPAL',
}
export enum OrderStatus {
  Order_Placed = 'ORDER_PLACED',// the order is registered in the merchant's system
  Order_Confirmed = 'ORDER_CONFIRMED',// confirms that the order is legit
  Order_Processing = 'ORDER_PROCESSING', //ready for shipment
  In_Transit = 'IN_TRANSIT', // the package are moved
  Dilivered = 'DELIVERED', // the customer's address has successfully received the package
  Cancelled = 'CENCELLED', // stock issues or payment problems
}
export enum PaymentStatus {
  Pending = 'PENDING',
  Paid = 'PAID',
  Refunded = 'REFUNDED'
}
export enum PromotionLevel {
  Level_Order = 'ORDER_LEVEL',
  Level_Product = 'PRODUCT_LEVEL'
}
