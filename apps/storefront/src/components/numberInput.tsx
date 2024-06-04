import { useMutation, useQuery } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react';
import { getCart, updateCart } from '../utils/api/graphQL/query';
import { useDebouncedCallback } from 'use-debounce';
import { useLoading } from '../utils/providers/loading';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CartItems } from '../utils/interfaces/cart';

interface Props {
  cartItems: CartItems
  updateAction: (cartItem: CartItems[]) => void

}
export default function CounterInput({ cartItems, updateAction }: Props) {
  const [updateCartMutation] = useMutation(updateCart);
  const { setLoading }: any = useLoading()
  const handleChange = async (event: any) => {
    const value = event.target.value
    if (value <= 0 || value === null || isNaN(value) || value === '') {
      return
    }
    setLoading(true)
    await debouncedUpdate(value.toString())
  }
  const deleteHandler = async () => {
    setLoading(true)
    await debouncedUpdate('0')
  }

  const debouncedUpdate = useDebouncedCallback(async (quantity: string) => {
    console.log('quantity: ', quantity)
    try {
      const {data} = await updateCartMutation({
        variables: {
          bookId: cartItems?.book?.id,
          quantity: parseInt(quantity),
          isReplace: true
        },
      });
      updateAction(data.updateCart.cartItem)
      console.log(data.updateCart.cartItem)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, 500);
  return (
      <div>
      <input value={cartItems?.quantity} onChange={handleChange} type="number" className="mr-5 w-8/12 input-style" />
      <button onClick={deleteHandler}>
                  <CloseOutlinedIcon fontSize='large' sx={{ color: 'red' }} className='cursor-pointer' />
                </button>
    </div>
  );
}
