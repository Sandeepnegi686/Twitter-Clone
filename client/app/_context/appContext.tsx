"use client";

import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import API_BASE_URL from "../_lib/api";
import toast from "react-hot-toast";
import useUserModel from "../_hooks/useUser";
import { UserType } from "../types/UserType";
// type UserType = { _id: string; email: string; name: string };

type ContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
} | null;

const APP_CONTEXT = createContext<ContextType>(null);

export function AppContext({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUserModel();

  // const router = useRouter();
  async function fetchUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
        credentials: "include",
      });
      if (!response.ok) {
        setUser(null);
        throw new Error(`HTTP server error, Status Code: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        setUser(null);
      } else {
        setUser(data.user);
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
  }, []);
  // useEffect(function () {
  //   fetchUser();
  // }, []);

  return (
    <APP_CONTEXT.Provider value={{ user, setUser }}>
      {children}
    </APP_CONTEXT.Provider>
  );
}

function useAppContext() {
  const context = useContext(APP_CONTEXT);
  if (!context) {
    throw new Error("Context use is out of scope");
  }
  return context;
}

export { useAppContext };
