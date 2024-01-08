import React, { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-full bg-slate-200 p-2 pb-4">
      {props.children}
    </div>
  )
}

export default Layout
