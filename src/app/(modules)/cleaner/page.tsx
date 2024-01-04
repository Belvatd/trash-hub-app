"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const handleLogout = async () =>
    await signOut(auth)
      .then(() => {
        router.push("/login");
        console.log("logout");
      })
      .catch((error) => {
        console.log(error);
      });
  return (
    <div>
      Cleaner Restricted Page
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Page;
