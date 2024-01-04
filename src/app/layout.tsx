import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "@/styles/globals.css"
import ClientProvider from "./ClientProvider"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-openSans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Trash Hub",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={openSans.variable}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
