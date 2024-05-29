'use client'
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import Label from "../../../components/label";
import Link from "next/link";
import { authApi, baseUrl } from "../../../utils/api";
import axios from "axios";
import { Fragment, useState } from "react";
import { Stack, Alert } from "@mui/material";
import { useLoading } from "../../../utils/providers/loading";
interface FormData {
  email: string
}
export default function ResetPassword() {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      email: '',
    }
  })
  const [error, setError] = useState('')
  const { setLoading }: any = useLoading()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
      try {
        const res = await axios({
          url: `${baseUrl+authApi.resetPassword}`,
          method: 'POST',
          data: data
        })
        reset()
        console.log(res)
      } catch (error) {
      setError('There is something error')
      }
      setLoading(false)
  }
  return (
    <Fragment>
       <Stack sx={{ width: '100%' }} spacing={2}>
        {error !== '' &&
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
              <Label htmlFor="email" text={'Your email'}></Label>
              <Input
                type="email"
                id="email"
                placeholder="youremail.@domain.com"
                {...register('email')}
              />
            </div>

          </div>
           <div className="mt-4">
              <button type="submit" className="btn-style2 w-full py-3 uppercase">submit</button>
            </div>
        </form>
        <p className="mt-4 text-center">
          Already have account? {' '}
          <Link href={'login'} style={{ color: '#c78443' }}>Login now</Link>
        </p>
      </div>
    </div>
    </Fragment>

  );
}
