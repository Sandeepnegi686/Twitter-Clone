"use client";
import useLoginModel from "@/app/_hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import RegisterModel from "./RegisterModel";
import useRegisterModel from "@/app/_hooks/useRegisterModel";

export default function LoginModel() {
  const regiterModel = useRegisterModel();
  const loginModel = useLoginModel();
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

  const onSubmit = useCallback(function () {
    try {
      setIsLoading(true);
      //TODO LOG IN

      loginModel.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
