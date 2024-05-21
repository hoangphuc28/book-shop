import Image from 'next/image'
import Logo from "../../../images/logo2.png";


export default function Footer() {
  return(
<footer className="py-10 text-white" style={{background: '#040028'}}>
  <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
    <div className="mb-8 md:mb-0 text-left md:text-left">
      <div className="flex justify-center w-full md:justify-start mb-4">
        <div className="text-5xl font-bold w-full tracking-wider leading-none">
          <div className="flex items-start space-x-2">
          <Image width={150} height={150} src={Logo} alt="logo" className="w-30" />
          </div>
        </div>
      </div>
      <p className="text-sm">Start a business and design the life you want – all in one place.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left md:text-left">
      <div>
        <h6 className="font-semibold mb-2">BUILD YOUR BUSINESS</h6>
        <ul>
          <li className="mb-1"><a href="#" className="hover:underline">Business ideas</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Case studies</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Design and branding</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Dropshipping</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Marketing</a></li>
        </ul>
      </div>
      <div>
        <h6 className="font-semibold mb-2">STORIES</h6>
        <ul>
          <li className="mb-1"><a href="#" className="hover:underline">A day in my life</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">My first 90 days</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Raise the bar</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Starter stories</a></li>
        </ul>
      </div>
      <div>
        <h6 className="font-semibold mb-2">YOUR LIFE</h6>
        <ul>
          <li className="mb-1"><a href="#" className="hover:underline">Mindset</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Money</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Productivity</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Wellbeing</a></li>
        </ul>
      </div>
      <div>
        <h6 className="font-semibold mb-2">FREE BUSINESS TOOLS</h6>
        <ul>
          <li className="mb-1"><a href="#" className="hover:underline">Business Name Generator</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Slogan Generator</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Traffic Calculator</a></li>
          <li className="mb-1"><a href="#" className="hover:underline">Profit Margin Calculator</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>


  )
}
