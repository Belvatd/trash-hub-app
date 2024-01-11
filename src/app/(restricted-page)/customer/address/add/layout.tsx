import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-full flex-col">
      <ServiceHeader pageName="Tambah Alamat" goToPage="/customer/address" />
      {props.children}
    </div>
  )
}

export default Layout
