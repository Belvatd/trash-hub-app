import { BottomNavigation } from "@/components/BottomNavigation"
import { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="relative h-full">
      {props.children}
      <BottomNavigation />
    </div>
  )
}

export default Layout
