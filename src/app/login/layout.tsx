import React, { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div
      className="flex h-screen w-full bg-slate-200 bg-cover p-2 pb-4"
      style={{ backgroundImage: "url(https://i.ibb.co/3c0P6T7/Bg.png)" }}
    >
      {props.children}
    </div>
  )
}

export default Layout
