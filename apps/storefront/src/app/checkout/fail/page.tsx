export default function CheckoutFail() {
  return (
   <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
  <div className="max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-red-600 mb-4">Checkout Failed</h2>
    <p className="text-gray-700">Your payment failed. Please try again later.</p>
    <a href="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">Continue Shopping</a>
  </div>
</div>

  )
}
