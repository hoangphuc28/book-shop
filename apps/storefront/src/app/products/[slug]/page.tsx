'use client'
import { Button, Rating } from "@mui/material";
import { getBook } from "../../../utils/api/graphQL/query";
import { useQuery } from "@apollo/client";
import { Book } from "../../../utils/interfaces/book";
import Image from "next/image";
import { formatVND } from '../../../utils/formatCurrency';
import { useOrder } from "../../../utils/providers/order";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import React from "react";
import ToastSuccess from "../../../components/toast/toastSuccess";
import { useLoading } from "../../../utils/providers/loading";
import ReviewComponent from "../../../components/review";

export default function Index({ params }: { params: { slug: string } }) {
  const [mess, setMess] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { setLoading }: any = useLoading()

  const { data } = useQuery(getBook, { variables: { id: params.slug } })
  const book: Book = data?.getBook as Book
  const { updateCart } = useOrder()
  const { push } = useRouter()
  const debouncedUpdate = useDebouncedCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Please sign in!');
        push('/auth/login');
        return;
      }
      const res = await updateCart(
        '1',
        params.slug,
        false
      )
      setMess('Product added successfully');
      setOpen(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, 500);
  const updateCartHandler = async () => {
    setLoading(true);
    await debouncedUpdate();
  };
  return (
    <div className="mt-10">
      <ToastSuccess message={mess} isOpen={open} setIsOpen={setOpen} />
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <div className="flex justify-center items-center">
            <Image width={300} height={300} src={book?.thumbnail} alt="product" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {book?.title}
          </h2>
          <div className="flex items-center mb-4">
            {/* <Rating name="read-only" size="small" defaultValue={book?.rating} precision={1} readOnly /> */}
            {/* <div className="text-xs text-gray-500 ml-3">({book?.reviews?.length})</div> */}
          </div>
          <div className="space-y-2">
            {/* <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">In Stock</span>
            </p> */}
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Author: </span>
              <span className="text-gray-600">{book?.author?.name}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">{book?.category?.name}</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">{formatVND(book?.price)}</p>
            {/* <p className="text-base text-gray-400 line-through">$55.00</p> */}
          </div>
          <p className="mt-4 text-gray-600">
            {book?.description}
          </p>
          <div className="mt-6 flex gap-3 pb-5 pt-5">
            <button
              className="btn-style1 px-2 py-2 block text-center"
              onClick={updateCartHandler}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <ReviewComponent productId={params.slug} reviewsData={book?.reviews} />

    </div>
  );
}
