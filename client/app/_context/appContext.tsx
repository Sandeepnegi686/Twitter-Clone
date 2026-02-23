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
type UserType = { _id: string; email: string; name: string };

type ContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
} | null;

const APP_CONTEXT = createContext<ContextType>(null);

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);

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
      if (!data.success) {
        setUser(null);
      }
      console.log(data.user);
      setUser(data.user);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Something went wrong";
      console.log(errMsg);
    }
  }
  useEffect(function () {
    fetchUser();
  }, []);

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
