'use client';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaypalLogo from '../../../images/logopaypal.png';
import Image from 'next/image';
import { Fragment } from 'react';
import SummaryOrder from '../../components/summaryOrder';
import Label from '../../components/label';
import { useForm } from 'react-hook-form';

import { Input } from '../../components/input';
import { PaymentMethod } from '../../utils/interfaces/enum';
import { getInformation } from '../../utils/api/graphQL/query';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderInformationSchema } from './checkoutSchema';
import { useOrder } from '../../utils/providers/order';
import { z } from 'zod';
import { CreateOrderInput, OrderItemInput } from '../../utils/interfaces/order';
import { createOrder as createOrderQuery } from '../../utils/api/graphQL/query'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Checkout() {
  const { push, refresh } = useRouter()
  const { promotion, cart, resetOrder } = useOrder();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof orderInformationSchema>>({
    resolver: zodResolver(orderInformationSchema),
  });
  const { data } = useQuery(getInformation);
  const [createOrder] = useMutation(createOrderQuery);

  const useDefaultInformation = () => {
    const information = data?.information;
    const currentValues = getValues();
    reset({
      ...currentValues,
      fullName: information?.fullName,
      address: information?.address,
      phone: information?.phone,
      email: information?.email,
    });
  };
  const onSubmit = async (data: z.infer<typeof orderInformationSchema>) => {
    try {
      const order: CreateOrderInput = {
        orderItems: [],
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        paymentMethod: data.paymentMethod,
        promotionId: promotion?.id
      }
      for (let i = 0; i < cart.length; i++) {
        const orderItem: OrderItemInput = {
          bookId: cart[i]?.book?.id,
          quantity: cart[i]?.quantity,
        }
        order.orderItems?.push(orderItem);
      }
      await createOrder({
        variables: order
      })
      await resetOrder()
      alert('Order successfully')
      window.location.href = '/products'
      console.log(order);
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <Fragment>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6 mt-10">
            <div className="col-span-7 border border-gray-200 p-4 rounded mr-5">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" text={'Full name'} />
                  <Input {...register('fullName')} />
                  {errors.fullName && (
                    <p className="text-rose-500 text-xs">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address" text={'Address'}></Label>
                  <Input {...register('address')} />
                  {errors.address && (
                    <p className="text-rose-500 text-xs">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" text={'Phone'}></Label>
                  <Input {...register('phone')} />
                  {errors.phone && (
                    <p className="text-rose-500 text-xs">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" text={'Email'}></Label>
                  <Input {...register('email')} />
                  {errors.email && (
                    <p className="text-rose-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <a
                  onClick={useDefaultInformation}
                  style={{ color: '#c78443', cursor: 'pointer' }}
                  className="underline block mt-1"
                >
                  Use default information
                </a>
                <div>
                  <div
                    className="payment pl-5"
                    style={{ display: 'flex', justifyContent: 'start' }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        margin: 0,
                        alignItems: 'center',
                      }}
                    >
                      <input
                        {...register('paymentMethod')}
                        id="cod"
                        required
                        style={{ height: 20, width: 20 }}
                        type="radio"
                        defaultValue={PaymentMethod.Cod}
                        name="paymentMethod"
                      />
                      <div className="mr-10 ml-5">
                        <LocalShippingOutlinedIcon sx={{ fontSize: 40 }} />
                      </div>
                      <p>
                        Cod
                        <br />
                        Thanh toán khi nhận hàng
                      </p>
                    </label>
                  </div>
                  <div
                    className="payment pl-5"
                    style={{ display: 'flex', justifyContent: 'start' }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        margin: 0,
                        alignItems: 'center',
                      }}
                    >
                      <input
                        {...register('paymentMethod')}
                        id="paypal"
                        required
                        style={{ height: 20, width: 20 }}
                        type="radio"
                        defaultValue={PaymentMethod.Paypal}
                        name="paymentMethod"
                      />
                      <div className="mr-5 ml-5">
                        <Image
                          src={PaypalLogo}
                          alt="#"
                          width={60}
                          height={60}
                        />
                      </div>
                      <p>
                        Paypal
                        <br />
                        Thanh toán trực tuyến
                      </p>
                    </label>
                  </div>
                  {/* <button
                    type="submit"
                    className="btn-style1 block w-full text-center py-4"
                    style={{ fontSize: '16px' }}
                  >
                    Submit
                  </button> */}
                </div>
              </div>
            </div>
            <div className="col-span-5 border border-gray-200 p-4 rounded mr-5">
              <SummaryOrder action={<button
                type='submit'
                className="btn-style1 px-2 py-2 w-full block text-center"
              >
                Submit
              </button>} />
            </div>
          </div>
        </form>

      </div>
    </Fragment>
  );
}
