"use client";
import { useRouter } from "next/navigation";

import { BsTwitter } from "react-icons/bs";

export default function SidebarLogo() {
  const router = useRouter();

  return (
    <div
      className="rounded-full h-14 w-14 flex items-center justify-center hover:opacity-70 cursor-pointer transition"
      onClick={() => router.push("/")}
    >
      <BsTwitter size={30} color="white" />
    </div>
  );
}
