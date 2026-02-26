"use client";
import { Toaster } from "react-hot-toast";
import FollowBar from "./_components/FollowBar";
import Model from "./_components/Model";
import LoginModel from "./_components/Models/LoginModel";
import RegisterModel from "./_components/Models/RegisterModel";
import Sidebar from "./_components/Sidebar";
import "./globals.css";
// import { AppContext } from "./_context/appContext";
import useUserModel from "./_hooks/useUser";
import { useUsersModel } from "./_hooks/useUsers";
import { useEffect } from "react";
import API_BASE_URL from "./_lib/api";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const { setUser } = useUserModel();
  const { setUsers } = useUsersModel();

  async function fetchAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/user/users`);
      if (!response.ok) {
        throw new Error(`HTTP server error, Status Code: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Something went wrong";
      console.log(errMsg);
    }
  }

  useEffect(function () {
    const data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;
    if (data) setUser(data);
    fetchAllUsers();
  }, []);

  return (
    <html lang="en">
      {/* <AppContext> */}
      <body className="h-full bg-black">
        <div className="h-screen">
          {/* <Model isOpen title="Test Model" actionLabel="Submit" /> */}
          <LoginModel />
          <RegisterModel />
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
        <Toaster />
      </body>
      {/* </AppContext> */}
    </html>
  );
}
