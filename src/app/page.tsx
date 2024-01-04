import Link from "next/link"

export default function Home() {
  return (
    <main className="p-10">
      Trash Hub
      <div>Anda ingin bergabung sebagai apa</div>
      <div className="flex gap-2">
        <Link href="/registration/cleaner">
          <button className="bg-slate-400">Cleaner</button>
        </Link>
        <Link href="/registration/customer">
          <button className="bg-slate-400">Customer</button>
        </Link>
      </div>
    </main>
  )
}
