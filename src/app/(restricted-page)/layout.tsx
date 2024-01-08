import { BottomNavigation } from "@/components/BottomNavigation"
import { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div>
      {props.children}
      <BottomNavigation />
    </div>
  )
}

export default Layout
