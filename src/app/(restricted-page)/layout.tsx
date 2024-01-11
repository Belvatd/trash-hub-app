import React, { PropsWithChildren } from "react"
import AuthProvider from "./AuthProvider"

const Layout = (props: PropsWithChildren) => {
  return <AuthProvider>{props.children}</AuthProvider>
}

export default Layout
