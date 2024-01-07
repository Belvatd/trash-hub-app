"use client";

import { auth } from "@/firebase/config";
import { BottomNavigation as Nav, BottomNavigationAction } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Home, Settings, Star, User } from "react-feather";

const BottomNavigation = () => {
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.emailVerified) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    });
  }, []);
  return (
    <>
      {isVerified && (
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
      )}
    </>
  );
};

export default BottomNavigation;
