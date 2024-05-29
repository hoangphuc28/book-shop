'use client'
import { useForm } from "react-hook-form";
import { Input } from "../../../../components/input";
import Label from "../../../../components/label";
import { authApi, baseUrl } from "../../../../utils/api";
import axios from "axios";
import { Fragment, useState } from "react";
import { Stack, Alert } from "@mui/material";
import { useLoading } from "../../../../utils/providers/loading";
import { schema } from './resetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyResetPassword() {
  const { register, handleSubmit, reset, formState: {errors} } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { setLoading }: any = useLoading()
  const searchParams = useSearchParams();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const token = searchParams.get('token')
    setLoading(true)
      try {
        const res = await axios({
          url: `${baseUrl+authApi.verifyResetPassword}?token=${token}`,
          method: 'POST',
          data: data
        })
        setError('')
        setSuccess(res.data.message)
        reset()
        alert('Reset password successfully')
        router.push('/auth/login')
      } catch (error: any) {
        setSuccess('')
        setError(error.response.data.message)
      }
      setLoading(false)
  }
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
        <h2 className="text-2xl uppercase font-medium mb-1">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="space-y-2">
            <div>
              <Label htmlFor="password" text={'New Password'}></Label>
              <Input
                type="password"
                id="password"
                placeholder="New password"
                {...register('password')}
              />
                {errors.password && <p className="text-rose-500 text-xs">{errors.password.message}</p>}

            </div>
            <div>
              <Label htmlFor="passwordConfirm" text={'Confirm Password'}></Label>
              <Input
                type="password"
                id="passwordConfirm"
                placeholder="Confirm password"
                {...register('passwordConfirm')}
              />
                {errors.passwordConfirm && <p className="text-rose-500 text-xs">{errors.passwordConfirm.message}</p>}

            </div>
          </div>
           <div className="mt-4">
              <button type="submit" className="btn-style2 w-full py-3 uppercase">submit</button>
            </div>
        </form>
      </div>
    </div>
    </Fragment>

  );
}
