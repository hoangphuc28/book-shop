'use client'
import { Fragment, useState } from 'react';
import Label from '../../../components/label';
import { Input } from '../../../components/input';
import { Stack, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Login } from '../../../utils/interfaces/login';
import { useAuth } from '../../../utils/providers/auth';
import Link from 'next/link';



export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<Login>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const [error, setError] = useState('')
  const onSubmit = async (data: Login) => {
    try {
      const res = await login(data)
      console.log(res)
      setError('')
      reset()
      router.push('/')
    } catch (error: any) {
      let message;
      if (error.response.status === 400)
        message = 'Email or password is incorrect'
      else
        message = 'Error'
      setError(message)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">Welcome back customer</p>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="space-y-2">
              <div>
                <Label text="Email" htmlFor="email" />
                <Input id="email" type="text" {...register('email')} />
              </div>
              <div>
                <Label text="Password" htmlFor="password" />
                <Input id="password" type="password" {...register('password')} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link href={'reset'} className="text-primary">
                Forgot passwords
              </Link>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="btn-style2 w-full py-3 uppercase"
              >
                Login
              </button>
            </div>
          </form>
          {/* login with */}
          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or login with
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
          </div>
          <div className="mt-4 flex gap-4">
            <a href="#" className="w-full py-3 text-center text-white bg-red-600 uppercase font-medium text-sm">google</a>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Dont have an account? {' '}
            <Link href={'register'} style={{ color: '#c78443' }}>Register now</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
