"use client"

import { BottomNavigation as Nav, BottomNavigationAction } from "@mui/material"
import { Home, Settings, Star, User } from "react-feather"

const BottomNavigation = () => {
  return (
    <Nav
      className="mx-0 lg:mx-[505px]"
      style={{
        maxWidth: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigationAction icon={<Home />} />
      <BottomNavigationAction icon={<Star />} />
      <BottomNavigationAction icon={<User />} />
      <BottomNavigationAction icon={<Settings />} />
    </Nav>
  )
}

export default BottomNavigation
