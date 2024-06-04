'use client'

import { Fragment, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getCart, updateCart } from '../../utils/api/graphQL/query';
import CartItem from './cartItem';

import { CartItems } from '../../utils/interfaces/cart';
import { formatVND } from '../../utils/formatCurrency';

export default function Cart() {
  const [cart, setCart] = useState<CartItems[]>([])
  const [amount, setAmount] = useState(0)
  const { data } = useQuery(getCart, {
    // fetchPolicy: 'network-only', // Always fetch fresh data
  });
  useEffect(() => {
    setCart(data?.getCart?.cartItem)
    setAmount(data?.getCart?.amount)
    console.log(data?.getCart)
  }, [data])
  return (
    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6 mt-5">
      <div className="col-span-7 space-y-4">
        {cart?.map((item: any, index: number) => {
          return (
            <Fragment key={index}>
              <CartItem updateAction={() => setCart} cartItem={item} />
            </Fragment>
          )
        })}
        <div>
          <div className="flex">
            <input placeholder="Enter coupon code" type="text" name="first-name" id="first-name" className="mr-5 input-style w-8/12" />
            <a href="#" className="btn-style1 px-4 py-2 w-4/12 block text-center">
              APPLY COUPON
            </a>
          </div>
        </div>
      </div>

      <div className="col-span-5 border border-gray-200 p-4 rounded">
        <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
          order summary
        </h4>
        <div className="space-y-2">
          {cart?.map((item: CartItems, index: number) => {
            return (
              <div className="flex justify-between" key={index}>
                <div>
                  <h5 className="text-gray-800 font-medium">{item?.book?.title}</h5>
                  <p className="text-sm text-gray-600">{item?.book?.author?.name}</p>
                </div>
                <p className="text-gray-600">x{item?.quantity}</p>
                <p className="text-gray-800 font-medium">{formatVND((item?.quantity*parseFloat(item?.book?.price)).toString())}</p>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
          <p>subtotal</p>
          <p>{formatVND(amount?.toString())}</p>
        </div>
        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
          <p>shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
          <p className="font-semibold">Total</p>
          <p>{formatVND(amount?.toString())}</p>
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
        <a
          href="/checkout"
          className="btn-style1 px-2 py-2 w-full block text-center"
        >
          CHECKOUT
        </a>
      </div>
    </div>
  );
}
