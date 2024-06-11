
import { captureOrderMutation } from "./captureOrder"
import { redirect } from 'next/navigation'
export default async function CheckoutSuccess({searchParams}: {searchParams?: {
  token?: string,
  PayerID?: string,
  orderId?: string
}}) {
  const token = searchParams?.token || ''
  const orderId = searchParams?.orderId || ''
  const res = await captureOrderMutation(token, orderId)
  if(res?.data?.captureOrder === 'fail') {
    redirect('/checkout/fail')
  }
  return (
   <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
  <div className="max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-green-600 mb-4">Checkout Successful!</h2>
    <p className="text-gray-700">Your payment was successful. Thank you for your order!</p>
    <a href="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">Continue Shopping</a>
  </div>
</div>
  )
}
