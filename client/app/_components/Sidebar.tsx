"use client";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
import { useRouter } from "next/navigation";
import useUserModel from "../_hooks/useUser";
import API_BASE_URL from "../_lib/api";
import { useEffect } from "react";

async function fetchCurrentUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      credentials: "include",
    });
    if (response.status == 401) {
      localStorage.removeItem("user");
      return null;
    }
    if (!response.ok) {
      throw new Error(`HTTP server error, Status Code: ${response.status}`);
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Something went wrong";
    console.log(errMsg);
  }
}

export default function Sidebar() {
  const { user, setUser } = useUserModel();
  const router = useRouter();
  const items = [
    { label: "Home", href: "/", icon: BsHouseFill },
    { label: "Notifications", href: "/notifications", icon: BsBellFill },
    { label: "Profile", href: "/users/", icon: FaUser },
  ];

  useEffect(function () {
    const data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;
    if (data) {
      setUser(data);
      fetchCurrentUser();
    }
  }, []);

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-57.5">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          {user && (
            <SidebarItem
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
                router.push("/api/logout");
              }}
              // href={"/api/logout"}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
