import { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="bgImage-public h-screen w-full p-2 pt-3">
      <div className="flex min-h-52 w-full rounded-xl bg-white p-4">
        {props.children}
      </div>
    </div>
  )
}

export default Layout
