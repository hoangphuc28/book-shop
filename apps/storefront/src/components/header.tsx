import Image from 'next/image'
import Logo from '../../../images/logo.svg'
export default function Header() {
  return(
   <header className="py-4 shadow-sm bg-white">
  <div className="container flex items-center justify-between">
    <a href="index.html">
      <Image src={Logo} alt="Logo" className="w-32" />
    </a>
    <div className="flex items-center space-x-4">
      <a href="#" className="text-center text-gray-700 hover:text-primary transition relative">
        <div className="text-2xl">
          <i className="fa-solid fa-bag-shopping" />
        </div>
        <div className="text-xs leading-3">Cart</div>
        <div className="absolute -right-5 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
          2</div>
      </a>
      <a href="#" className="text-center text-gray-700 hover:text-primary transition relative">
        <div className="text-2xl">
          <i className="fa-regular fa-user" />
        </div>
        <div className="text-xs leading-3">Account</div>
      </a>
    </div>
  </div>
</header>

  )
}
