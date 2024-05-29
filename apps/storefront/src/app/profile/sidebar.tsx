'use client'
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../utils/providers/auth";
export default function SideBarProfile() {
  const {logout} = useAuth()
  const router = useRouter()
  const logoutHandler = async () => {
      try {
        await logout()
        router.push('/auth/login')
      } catch (error) {
        alert(error)
      }
  }
  return (
    <div className="col-span-3">
      <div className="px-4 py-3 shadow flex items-center gap-4">
        <div className="flex-grow">
          <p className="text-gray-600">Hello, have a nice day</p>
        </div>
      </div>
      <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
        <div className="space-y-1 pl-8">
          <Link href="/profile/information" className="relative hover:text-primary block capitalize transition">
            information
          </Link>
          <Link href="/profile/account" className="relative hover:text-primary block capitalize transition">
            Account
          </Link>
        </div>
        <div className="space-y-1 pl-8 pt-4">
          <Link href="/profile/orders" className="relative hover:text-primary block font-medium capitalize transition">
            <span className="absolute -left-8 top-0 text-base">
              <i className="fa-solid fa-box-archive" />
            </span>
            Orders history
          </Link>
          <a href="/profile/orders/returns" className="relative hover:text-primary block capitalize transition">
            Orders returns
          </a>
          <a href="/profile/orders/cancellations" className="relative hover:text-primary block capitalize transition">
            Orders Cancellations
          </a>
        </div>
        <div className="space-y-1 pl-8 pt-4">
          <Button onClick={() => logoutHandler()} className="relative hover:text-primary block font-medium capitalize transition">
            <span className="absolute -left-8 top-0 text-base">
              <i className="fa-regular fa-arrow-right-from-bracket" />
            </span>
            Logout
          </Button>
        </div>
      </div>
    </div>

  )
}
