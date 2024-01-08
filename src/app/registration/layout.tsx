import { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: "url(https://i.ibb.co/3c0P6T7/Bg.png)" }}
    >
      {props.children}
    </div>
  )
}

export default Layout
