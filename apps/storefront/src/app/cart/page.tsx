'use client'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { useState } from 'react';
import NumberInput from '../components/numberInput';

export default function Cart() {
  const src =
    "https://cdn.shopify.com/s/files/1/0533/2089/files/design-books-the-design-of-everyday-things-book-cover.jpg?v=1587988106";

  return (
    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6 mt-5">
      <div className="col-span-7 space-y-4">

        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
          <div className="w-28">
            <img
              src={src}
              width={100}
              height={100}
              style={{ width: 100, height: 100, objectFit: "contain" }}
              alt="product 6"
            />
          </div>
          <div className="w-1/3">
            <h2 className="text-gray-800 text-xl font-medium uppercase">
              Sofa
            </h2>
            <p className="text-gray-500 text-sm">
              Availability: <span className="text-green-600">In Stock</span>
            </p>
          </div>
          <div className="text-primary text-lg font-semibold">$320.00</div>
          <div className='ml-5'>
            <NumberInput
            />
          </div>
          <CloseOutlinedIcon fontSize='large' sx={{ color: 'red' }} className='cursor-pointer' />
          <div className="text-gray-600 cursor-pointer hover:text-primary">
            <i className="fa-solid fa-trash" />
          </div>
        </div>
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
          <div className="flex justify-between">
            <div>
              <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
              <p className="text-sm text-gray-600">Size: M</p>
            </div>
            <p className="text-gray-600">x3</p>
            <p className="text-gray-800 font-medium">$320</p>
          </div>
          <div className="flex justify-between">
            <div>
              <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
              <p className="text-sm text-gray-600">Size: M</p>
            </div>
            <p className="text-gray-600">x3</p>
            <p className="text-gray-800 font-medium">$320</p>
          </div>
          <div className="flex justify-between">
            <div>
              <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
              <p className="text-sm text-gray-600">Size: M</p>
            </div>
            <p className="text-gray-600">x3</p>
            <p className="text-gray-800 font-medium">$320</p>
          </div>
          <div className="flex justify-between">
            <div>
              <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
              <p className="text-sm text-gray-600">Size: M</p>
            </div>
            <p className="text-gray-600">x3</p>
            <p className="text-gray-800 font-medium">$320</p>
          </div>
        </div>
        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
          <p>subtotal</p>
          <p>$1280</p>
        </div>
        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
          <p>shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
          <p className="font-semibold">Total</p>
          <p>$1280</p>
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
