import { BottomNavigation } from "@/components/BottomNavigation"
import React, { PropsWithChildren } from "react"
import { Home, Pocket, Repeat, User } from "react-feather"

const items = [
  {
    route: "/customer",
    icon: <Home />,
  },
  {
    route: "/customer/history",
    icon: <Repeat />,
  },
  {
    route: "/customer/tree",
    icon: <Pocket />,
  },
  {
    route: "/customer/account",
    icon: <User />,
  },
]

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="relative h-full w-full">
      {props.children}
      <BottomNavigation items={items} />
    </div>
  )
}

export default Layout
