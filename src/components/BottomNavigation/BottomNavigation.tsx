"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

type TBottomNavigationProps = {
  items: { route: string; icon: JSX.Element }[]
}

const BottomNavigation = ({ items }: TBottomNavigationProps) => {
  const pathname = usePathname()

  const checkActive = (route: string) => pathname === route

  const isShowNav = items.some((val) => checkActive(val.route))

  if (isShowNav) {
    return (
      <div className="absolute bottom-0 w-full border-t bg-white pb-[14px]">
        <div className="flex w-full items-center justify-center p-[10px]">
          {items.map((item, i) => (
            <div key={i} className="flex-1">
              <div
                className={clsx(
                  "mx-auto w-10 rounded-xl p-2 text-gray-500",
                  checkActive(item.route) && "bg-brand-50 !text-brand-600",
                )}
              >
                <Link href={item.route}>{item.icon}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default BottomNavigation
