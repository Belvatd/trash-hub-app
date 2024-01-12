"use client"

// import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { BounceLoader } from "react-spinners"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push("/login")
  }, [router])

  return (
    <main className="p-10">
      <BounceLoader
        color="#309C7A"
        className="fixed left-1/2 -translate-x-1/2 transform"
      />
      {/* Trash Hub
      <div>Anda ingin bergabung sebagai apa</div>
      <div className="flex gap-2">
        <Link href="/registration/cleaner">
          <button className="bg-slate-400">Cleaner</button>
        </Link>
        <Link href="/registration/customer">
          <button className="bg-slate-400">Customer</button>
        </Link>
      </div>
      <Link href="/login" className="mt-1 block">
        <button className="bg-slate-400">Login</button>
      </Link> */}
    </main>
  )
}
