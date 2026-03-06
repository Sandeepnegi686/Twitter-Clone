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

async function authenticateCurrentUser(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      credentials: "include",
    });
    if (response.status == 401) {
      return false;
    }
    if (!response.ok) {
      throw new Error(`HTTP server error, Status Code: ${response.status}`);
    }
    return true;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Something went wrong";
    console.log(errMsg);
    return false;
  }
}

export default function Sidebar() {
  const { user, setUser } = useUserModel();
  const router = useRouter();
  const items = [
    { label: "Home", href: "/", icon: BsHouseFill },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      alert: user?.hasNotifications,
    },
    { label: "Profile", href: `/users/${user?._id}`, icon: FaUser },
  ];

  useEffect(function () {
    async function checkCurrentUser() {
      if (await authenticateCurrentUser()) {
        const data = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")!)
          : null;
        setUser(data);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    }
    checkCurrentUser();
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
              alert={item?.alert}
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
