import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { getCart, updateCart } from '../utils/api/graphQL/query';
import { count } from 'rxjs';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { useLoading } from '../utils/providers/loading';
interface Props {
  defaultValue: number
  productId: string
}
export default function CounterInput({ defaultValue, productId }: Props) {
  const [count, setCount] = useState(defaultValue)
  const [updateCartMutation] = useMutation(updateCart);
  const {push} = useRouter()
  const {setLoading}: any = useLoading()

  const handleChange = async (event: any) => {
    setLoading(true)
    const value = event.target.value
    if (value < 0 || value === null || isNaN(value) || value === '') {
      console.log(0)
    }
    setCount(value)
    await debouncedUpdate()
  }

  const debouncedUpdate = useDebouncedCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Please sign in!');
        push('/auth/login');
        return;
      }
      const res = await updateCartMutation({
        variables: {
          bookId: productId,
          quantity: parseInt(count),
          isReplace: true
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, 500);
  return (
    <input value={count} onChange={handleChange} type="number" className="mr-5 w-8/12 input-style" />

  );
}
