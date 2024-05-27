'use client'
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './registrationSchema';
import { z } from 'zod';
import Label from "../../../components/label";
import { Input } from "../../../components/input";
import axios from "axios";
import { authApi, baseUrl } from "../../api";
import { Fragment, useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";
import { useLoading } from "apps/storefront/src/components/loading";

export default function RegisterPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })
  const { setLoading }: any = useLoading()
  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    try {
      const res = await axios({
        url: `${baseUrl}${authApi.register}`,
        method: 'POST',
        data: data
      })
      setError('')
      setSuccess(res.data.message)
      reset();
    } catch (error: any) {
      setSuccess('')
      setError(error.response.data.message)
    }
    setLoading(false)


  };
  useEffect(() => {
    if (error || success) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error, success]);
  return (
    <Fragment>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {success !== '' ? <Alert severity="success" onClose={() => { setSuccess('') }}>
          {success}
        </Alert> : error !== '' &&
          <Alert severity="error" onClose={() => { setError('') }}>
            {error}
          </Alert>
      }
      </Stack>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Create an account</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Register for new cosutumer
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <div>
                <Label text="Full Name" htmlFor="fullName" />
                <Input id="fullName" type="text" {...register('fullName')} />

                {errors.fullName && <p className="text-rose-500 text-xs">{errors.fullName.message}</p>}
              </div>
              <div>
                <Label text="Email" htmlFor="email" />
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-rose-500 text-xs">{errors.email.message}</p>}
              </div>
              <div>
                <Label text="Address" htmlFor="address" />
                <Input id="address" type="text" {...register('address')} />
                {errors.address && <p className="text-rose-500 text-xs">{errors.address.message}</p>}
              </div>
              <div>
                <Label text="Phone" htmlFor="phone" />
                <Input id="phone" type="tel" {...register('phone')} />
                {errors.phone && <p className="text-rose-500 text-xs">{errors.phone.message}</p>}
              </div>
              <div>
                <Label text="Password" htmlFor="password" />
                <Input id="password" type="password" {...register('password')} />
                {errors.password && <p className="text-rose-500 text-xs">{errors.password.message}</p>}
              </div>
              <div>
                <Label text="Confirm Password" htmlFor="passwordConfirm" />
                <Input id="passwordConfirm" type="password" {...register('passwordConfirm')} />
                {errors.passwordConfirm && <p className="text-rose-500 text-xs">{errors.passwordConfirm.message}</p>}
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn-style2 w-full py-3 uppercase">CREATE ACCOUNT</button>
            </div>
          </form>
          {/* login with */}
          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
          </div>
          <div className="mt-4 flex gap-4">
            <a href="#" className="w-full py-3 text-center text-white bg-red-600 uppercase font-medium text-sm">google</a>
          </div>
          {/* ./login with */}
          <p className="mt-4 text-center text-gray-600">Already have account? <Link href={'/auth/login'} style={{ color: '#c78443' }}>Login now</Link></p>
        </div>
      </div>
    </Fragment>
  )
}
