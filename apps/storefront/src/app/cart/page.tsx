'use client'

import { Fragment, useEffect } from 'react';

import CartItem from './cartItem';

import Ticket from '../../components/ticket';
import { Promotion } from '../../utils/interfaces/promotion';
import SummaryOrder from '../../components/summaryOrder';
import { useOrder } from '../../utils/providers/order';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const {push} = useRouter()
  const { promotions, cart, setCart } = useOrder()
  return (
    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6 mt-5">
    {cart?.length !== 0 ?
      <div className="col-span-7 space-y-4">
      {cart?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            <CartItem updateAction={() => setCart} cartItem={item} />
          </Fragment>
        )
      })}
      <div>
        <div className="grid grid-cols-2 gap-2">
          {promotions?.map((item: Promotion, index: number) => {
            return (

              <Fragment key={index}>
                <Ticket promotion={item} />
              </Fragment>
            )
          })}
        </div>
      </div>
    </div> :
      <div className="col-span-7 space-y-4">
    <p>No items</p>
    </div>
    }
      <div className="col-span-5 border border-gray-200 p-4 rounded">
        <SummaryOrder
          action={
            cart?.length === 0 ? (
              <button disabled className="btn-style1 px-2 py-2 w-full block text-center">
                CHECKOUT
              </button>
            ) : (
              <Link href="/checkout" className="btn-style1 px-2 py-2 w-full block text-center">
                CHECKOUT
              </Link>
            )
          }
        />
      </div>
    </div>
  );
}
