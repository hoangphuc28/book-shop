import Link from "next/link";
import { CheckPromotionLevel } from "../utils/checkLevelPromotion";
import { formatVND, formatVndTo1k } from "../utils/formatCurrency"
import { CartItems } from "../utils/interfaces/cart"
import { useOrder } from "../utils/providers/order"
interface SummaryOrderProps {
  action: React.ReactNode;
}

export default function SummaryOrder({ action }: SummaryOrderProps) {
  const { cart, amount, promotion } = useOrder()
  const totalCalculate = (): number => {
    if(CheckPromotionLevel(promotion) === 1) {
      if(promotion?.validationRule?.percentage !== undefined)
        return amount - (amount*promotion?.validationRule?.percentage)/100
    }
    if(promotion?.validationRule?.discountValuePerProduct !== undefined)
      return amount-promotion?.validationRule?.discountValuePerProduct
    return amount
  }
  return (
    <div>
      <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
        order summary
      </h4>
      <div className="space-y-2">
        {cart?.map((item: CartItems, index: number) => {
          return (
            <div className="flex justify-between" key={index}>
              <div className="w-3/5">
                <h5 className="text-gray-800 font-medium">{item?.book?.title}</h5>
                <p className="text-sm text-gray-600">{item?.book?.author?.name}</p>
              </div>
              <p className="text-gray-600 w-1/5">x{item?.quantity}</p>
              <p className="text-gray-800 font-medium w-1/5 text-right">{formatVND((item?.quantity * parseFloat(item?.book?.price)).toString())}</p>
            </div>
          )
        })}
      </div>
      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>Subtotal</p>
        <p>{formatVND(amount?.toString())}</p>
      </div>
      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>Shipping</p>
        <p>Free</p>
      </div>
      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>Coupon</p>
        <p>{
          CheckPromotionLevel(promotion) === 1 ? promotion?.validationRule?.percentage + '%' :
          CheckPromotionLevel(promotion)  === 2 ?
              formatVND(promotion?.validationRule?.discountValuePerProduct?.toString()) : 0
        }</p>
      </div>
      <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
        <p className="font-semibold">Total</p>
        <p>{formatVND(totalCalculate()?.toString())}</p>
      </div>
      <div className="flex items-center mb-4 mt-2">
        <input
          type="checkbox"
          name="aggrement"
          id="aggrement"
          className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
        />
        <label
          htmlFor="aggrement"
          className="text-gray-600 ml-3 cursor-pointer text-sm"
        >
          I agree to the{" "}
          <a href="#" className="text-primary">
            terms &amp; conditions
          </a>
        </label>
      </div>
      {action}
      {/* <Link
        href="/checkout"
        className="btn-style1 px-2 py-2 w-full block text-center"
      >
        CHECKOUT
      </Link> */}
    </div>
  )
}
