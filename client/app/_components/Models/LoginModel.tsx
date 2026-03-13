"use client";
import useLoginModel from "@/app/_hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import useRegisterModel from "@/app/_hooks/useRegisterModel";
import API_BASE_URL, { api } from "@/app/_lib/api";
import toast from "react-hot-toast";
import { mutate } from "swr";
// import useUserModel from "@/app/_hooks/useUser";
import { UserType } from "@/app/types/UserType";

interface LoginApiResponse {
  success: boolean;
  message: string;
  user?: UserType;
}

export default function LoginModel() {
  const regiterModel = useRegisterModel();
  const loginModel = useLoginModel();
  // const { setUser } = useUserModel();
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
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });
        const data: LoginApiResponse = await res.json();
        if (!data.success!) {
          toast.error(data.message!);
        } else {
          toast.success(data.message!);
          mutate("/api/getCurrentUser");
          loginModel.onClose();
          // setUser(data.user);
          // await mutate("/api/getCurrentUser");
          // setUser(data.user!);
          // console.log(currentUser);
          // localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
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
