import { Order } from "../utils/interfaces/order";
import formatter from "../utils/timeFormat";
import { formatVND } from '../utils/formatCurrency';
import { OrderStatus } from "../utils/interfaces/enum";

interface Props {
  order: Order
}
const statusColors: { [key in OrderStatus]: string } = {
  [OrderStatus.PENDING]: 'text-yellow-400',
  [OrderStatus.DELIVERING]: 'text-blue-500',
  [OrderStatus.DELIVERED]: 'text-green-500',
  [OrderStatus.CENCELLED]: 'text-red-400',
  [OrderStatus.CANCEL_PENDING]: 'text-orange-500',
};
export default function OrderCard({ order }: Props) {
  const statusClass = statusColors[order.status] || 'bg-gray-500';
  console.log(order)
  const productTotalQuantity = order?.orderItems?.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
      {/* <div className="w-28">
                    <img
                        src={order?.orderItems[0]?.book?.thumbnail}
                        width={100}
                        height={100}
                        style={{ width: 100, height: 100, objectFit: "contain" }}
                        alt="product 6"
                    />
                </div> */}
      <div className="w-2/3">
        <h2 className="text-gray-800 text-xl font-medium uppercase">{order?.orderCode}
          <span className={`ml-2 text-xs ${statusClass} p-2 rounded`}>
            {order.status}
          </span>
        </h2>
        <p className="text-gray-500 text-sm">{formatter.format((order?.createdAt))}</p>
        <p className="text-gray-500 text-sm">{productTotalQuantity} products</p>
      </div>
      <div className="text-primary text-lg font-semibold">{formatVND(order?.total?.toString())}</div>
      <div>
        <div className="flex">
          <a href={`/profile/orders/${order?.orderID}`} className="underline block mr-5">
            View Detail</a>
        </div>

      </div>


    </div>


  )
}
