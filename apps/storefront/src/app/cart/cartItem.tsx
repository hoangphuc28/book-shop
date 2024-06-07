import Image from "next/image";
import NumberInput from "../../components/numberInput";
import { formatVND } from "../../utils/formatCurrency";

import { CartItems } from "../../utils/interfaces/cart";
import { Typography } from "@mui/material";

interface Props {
  cartItem: CartItems
  updateAction: (cartItem: CartItems[]) => void
}
export default function CartItem({ cartItem, updateAction }: Props) {
  return (
    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
      <div className="w-28">
        <Image
          src={cartItem?.book?.thumbnail}
          width={100}
          height={100}
          style={{ width: 100, height: 100, objectFit: "contain" }}
          alt="product"
        />
      </div>
      <div className="w-1/3">
        <h2 className="text-gray-800 text-xl font-medium uppercase">
          {cartItem?.book?.title}
        </h2>
        <p className="text-gray-500 text-sm">
          {cartItem?.book?.author?.name}
        </p>
      </div>
      <div className="text-primary text-lg font-semibold">
      <Typography>
            {formatVND((parseInt(cartItem?.book?.price)-cartItem?.book?.salePrice).toString())} {'  '}
            {cartItem?.book?.salePrice !== 0 &&
            <span className="text-base text-gray-400 line-through">{formatVND(cartItem?.book?.price)}</span>
            }
          </Typography>
      </div>
      <div className='ml-5'>
        <NumberInput cartItems={cartItem}/>
      </div>

      <div className="text-gray-600 cursor-pointer hover:text-primary">
        <i className="fa-solid fa-trash" />
      </div>
    </div>
  )
}
