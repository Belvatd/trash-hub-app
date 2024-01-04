"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import Link from "next/link";

const Page = () => {
  const handleLogout = async () => await signOut(auth);
  return (
    <div>
      Cleaner Restricted Page
      <Link href={"/login"}>
        <button onClick={handleLogout}>Logout</button>
      </Link>
    </div>
  );
};

export default Page;
