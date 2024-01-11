import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-full flex-col">
      <ServiceHeader pageName="Edit Alamat" />
      {props.children}
    </div>
  )
}

export default Layout
