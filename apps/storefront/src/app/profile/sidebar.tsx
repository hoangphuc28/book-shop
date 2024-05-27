'use client'
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "../../contexts/session";
import { deleteCookie, setCookie } from 'cookies-next';
import { authApi, baseUrl } from "../api";
import axios from "axios";
export default function SideBarProfile() {
  const router = useRouter()
  const {setAccessToken}: any = useSession()
  const logout = async () => {
    try {
      const res = await axios({
        url: `${baseUrl+authApi.logout}`,
        method: 'POST',
        withCredentials: true
      })
      localStorage.removeItem('accessToken')
      setAccessToken(null)
      router.push('/auth/login')
    } catch (error) {
      console.log(error)
    }

  }
    return (
        <div className="col-span-3">
            <div className="px-4 py-3 shadow flex items-center gap-4">
                <div className="flex-shrink-0">
                    <img src="../assets/images/avatar.png" alt="profile" className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
                </div>
                <div className="flex-grow">
                    <p className="text-gray-600">Hello,</p>
                    <h4 className="text-gray-800 font-medium">John Doe</h4>
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
                    <Button onClick={() => logout()} className="relative hover:text-primary block font-medium capitalize transition">
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
