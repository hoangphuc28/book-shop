'use client'
import { Fragment } from "react";

import { OrderStatus } from "../../../utils/interfaces/enum";
import { useQuery } from "@apollo/client";
import { getOrdersByAccount } from "../../../utils/api/graphQL/query";
import OrderCard from "../../../components/orderCard";
import { Order } from "../../../utils/interfaces/order";



export default function Orders() {
    const {data} = useQuery(getOrdersByAccount, {
      variables: {
        status: OrderStatus.PENDING
      }
    })

    return (
        <Fragment>
        <div className="col-span-9 space-y-4">

          {
            data?.findOrdersByAccountId?.map((item: Order, index: number) => {
              return(
                <Fragment key={index}>
                   <OrderCard order={item}/>
                </Fragment>
              )
            })
          }
</div>
        </Fragment>

    )
}
