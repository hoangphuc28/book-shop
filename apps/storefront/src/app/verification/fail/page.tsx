export default function VerificationFail() {
  return(
   <div className="bg-white p-10 rounded-lg shadow-md text-center h-96 flex justify-center items-center">
    <div>

  <div className="text-red-500 mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
  <h1 className="text-2xl font-bold mb-2">Verification Failed!</h1>
  <p className="text-gray-600 mb-6">There was a problem verifying your account.</p>
  </div>
</div>

  )
}
