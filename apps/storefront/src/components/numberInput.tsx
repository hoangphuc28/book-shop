import { useMutation, useQuery } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react';
import { getCart, updateCart } from '../utils/api/graphQL/query';
import { useDebouncedCallback } from 'use-debounce';
import { useLoading } from '../utils/providers/loading';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CartItems } from '../utils/interfaces/cart';
import { useOrder } from '../utils/providers/order';

interface Props {
  cartItems: CartItems;
}
export default function CounterInput({ cartItems }: Props) {
  const {setLoading}: any = useLoading()
  const { updateCart } = useOrder();
  const handleChange = async (event: any) => {
    const value = event.target.value;
    if (value <= 0 || value === null || isNaN(value) || value === '') {
      return;
    }
    setLoading(true)
    await debouncedUpdate(value.toString(), cartItems?.book?.id);

  };
  const deleteHandler = async () => {
    setLoading(true)
    await debouncedUpdate('0', cartItems?.book?.id);
  };
  const debouncedUpdate = useDebouncedCallback(
    async (quantity: string, productId: string) => {
      try {
        await updateCart(quantity, productId, true)

      } catch (error) {
          console.log(error)
          alert('Something error')
      } finally {
        setLoading(false)
      }
    },
    200
  );
  return (
    <div>
      <input
        value={cartItems?.quantity}
        onChange={handleChange}
        type="number"
        className="mr-5 w-8/12 input-style"
      />
      <button onClick={deleteHandler}>
        <CloseOutlinedIcon
          fontSize="large"
          sx={{ color: 'red' }}
          className="cursor-pointer"
        />
      </button>
    </div>
  );
}
