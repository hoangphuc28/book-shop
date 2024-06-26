'use client'
import { useEffect } from "react";
import { useAuth } from "./auth";
import { useRouter } from "next/navigation";

export default function WithAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const{token, loading} = useAuth()
  if(!loading && token === '') {
    router.replace('/auth/login')
    return
  }
  if (loading) {
    return <p></p>;
  }
  return (
    <>

    {children}
  </>
  )
}
