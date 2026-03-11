"use client";
import useRegisterModel from "@/app/_hooks/useRegisterModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import useLoginModel from "@/app/_hooks/useLoginModel";
import toast from "react-hot-toast";
import API_BASE_URL, { api } from "@/app/_lib/api";
// import { useAppContext } from "@/app/_context/appContext";
// import { getCurrentUser } from "@/app/_hooks/getCurrentUser";
import { mutate } from "swr";
import { UserType } from "@/app/types/UserType";
// import useUserModel from "@/app/_hooks/useUser";
// import useUserModel from "@/app/_hooks/useUser";

interface SignUpApiResponse {
  success: boolean;
  message: string;
  user?: UserType;
}

export default function RegisterModel() {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();
  // const { user, setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  // const { setUser } = useUserModel();

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(
    function () {
      if (isLoading) return;
      registerModel.onClose();
      loginModel.onOpen();
    },
    [isLoading, registerModel, loginModel],
  );

  const onSubmit = useCallback(
    async function () {
      try {
        setIsLoading(true);
        if (!email || !password || !name || !username) {
          toast.error("Feilds are empty");
          return;
        }
        // const res = await api.post<SignUpApiResponse>(
        //   `${API_BASE_URL}/api/v1/auth/signup`,
        //   { name, username, email, password },
        //   {
        //     withCredentials: true,
        //   },
        // );
        const res = await fetch("/api/signup", {
          body: JSON.stringify({ name, username, email, password }),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        // const res = await fetch("/api/login", {
        //   method: "POST",
        //   body: JSON.stringify({ email, password }),
        // });
        // const data: LoginApiResponse = await res.json();
        if (!data.success) {
          toast.error(data.message);
        } else {
          // setUser(data.user);
          toast.success(data.message);
          // setUser(data.user!);
          mutate("/api/getCurrentUser");
          // localStorage.setItem("user", JSON.stringify(data.user));
          registerModel.onClose();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [registerModel.isOpen, name, username, email, password],
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
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
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
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>{" "}
      </p>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModel.onClose}
      body={bodyContent}
      onSubmit={onSubmit}
      footer={footerContent}
    />
  );
}
