import type { Metadata, Viewport } from "next"
import { Open_Sans } from "next/font/google"
import "@/styles/globals.css"
import ClientProvider from "./ClientProvider"
import "@/styles/globals.css";
import clsx from "clsx";
import { BottomNavigation } from "@/components/BottomNavigation";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-openSans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trash Hub",
  description: "PWA application with Next 13",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [],
  icons: [
    { rel: "apple-touch-icon", url: "public/assets/icons/icon-192x192.png" },
    { rel: "icon", url: "public/assets/icons/icon-192x192.png" },
  ],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: "white",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(openSans.variable, "content")}>
        <BottomNavigation />
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
