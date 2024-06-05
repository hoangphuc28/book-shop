import Image from "next/image";
import NumberInput from "../../components/numberInput";
import { Book } from "../../utils/interfaces/book";
import { formatVND } from "../../utils/formatCurrency";
import { useMutation } from "@apollo/client";
import { updateCart } from "../../utils/api/graphQL/query";
import { useDebouncedCallback } from "use-debounce";
import { useLoading } from "../../utils/providers/loading";
import { CartItems } from "../../utils/interfaces/cart";

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
      <div className="text-primary text-lg font-semibold">{formatVND(cartItem?.book?.price)}</div>
      <div className='ml-5'>
        <NumberInput updateAction={updateAction} cartItems={cartItem}/>
      </div>

      <div className="text-gray-600 cursor-pointer hover:text-primary">
        <i className="fa-solid fa-trash" />
      </div>
    </div>
  )
}