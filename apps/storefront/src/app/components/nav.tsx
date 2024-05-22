import Link from "next/link";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Image from "next/image";
import Logo from "../../../images/logo2.png";
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
export default function Nav() {
  return (
    <nav className="sticky top-0 z-50" style={{background: '#040028'}}>
      <div className="container flex">
        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-6 capitalize">
          <Link href="/">
          <Image width={80} height={80} src={Logo} alt="logo"/>
        </Link>
            <div className="md:flex items-center cursor-pointer h-16 relative group hidden">
              <span className="capitalize ml-2 t-style1" style={{letterSpacing: '3px'}}>Categories</span>
              <div style={{background: '#c78443'}} className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                <a
                  href="#"
                  className="flex items-center px-6 py-3 transition"
                >
                  <span className="ml-3 text-sm t-style1" style={{letterSpacing: '3px'}}>Sofa</span>
                </a>
              </div>
            </div>
            <a
              href="/products"
              className="transition t-style1" style={{letterSpacing: '3px'}}
            >
              Shop
            </a>
            <a href="#" className="transition t-style1" style={{letterSpacing: '3px'}}>
              About us
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/auth/login" className="transition t-style1" style={{letterSpacing: '3px'}}>
              Login
            </a>
            <Link
              href="/cart"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="flex items-center">
                <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
              </div>
              <div className="absolute -right-3 -top-2 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                2
              </div>
            </Link>
            <Link href='/profile/information'>
            <AccessibleForwardOutlinedIcon fontSize="large" sx={{color: 'white'}}/></Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
