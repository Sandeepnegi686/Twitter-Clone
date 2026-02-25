"use client";
import useLoginModel from "@/app/_hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import RegisterModel from "./RegisterModel";
import useRegisterModel from "@/app/_hooks/useRegisterModel";
import API_BASE_URL, { api } from "@/app/_lib/api";
import axios from "axios";
import toast from "react-hot-toast";
// import { useAppContext } from "@/app/_context/appContext";
// import { getCurrentUser } from "@/app/_hooks/getCurrentUser";
import { mutate } from "swr";
import useUserModel from "@/app/_hooks/useUser";
import { UserType } from "@/app/types/UserType";

interface LoginApiResponse {
  success: boolean;
  message: string;
  user?: UserType;
}

export default function LoginModel() {
  const regiterModel = useRegisterModel();
  const loginModel = useLoginModel();
  // const { currentUser } = getCurrentUser();
  const { setUser } = useUserModel();
  // const { user, setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(
    function () {
      if (isLoading) return;
      regiterModel.onOpen();
      loginModel.onClose();
    },
    [isLoading, regiterModel, loginModel],
  );

  const onSubmit = useCallback(
    async function () {
      try {
        setIsLoading(true);
        if (!email || !password) {
          toast.error("Feilds are empty");
          return;
        }
        const res = await api.post<LoginApiResponse>(
          `${API_BASE_URL}/api/v1/auth/login`,
          {
            email,
            password,
          },
        );
        const { data } = res;
        if (!data.success!) {
          toast.error(data.message!);
        } else {
          // setUser(data.user);
          toast.success(data.message!);
          // await mutate("/api/getCurrentUser");
          setUser(data.user!);
          // console.log(currentUser);
          loginModel.onClose();
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, loginModel],
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Create an account?</p>
      <span
        className="text-white cursor-pointer hover:underline"
        onClick={onToggle}
      >
        Register
      </span>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModel.onClose}
      body={bodyContent}
      onSubmit={onSubmit}
      footer={footerContent}
    />
  );
}
