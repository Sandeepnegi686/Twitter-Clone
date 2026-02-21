"use client";
import useRegisterModel from "@/app/_hooks/useRegisterModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import useLoginModel from "@/app/_hooks/useLoginModel";

export default function RegisterModel() {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

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
    function () {
      try {
        setIsLoading(true);
        //TODO REGISTER AND LOG IN

        registerModel.onClose();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [registerModel],
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
      <p>Already have an account?</p>
      <span
        className="text-white cursor-pointer hover:underline"
        onClick={onToggle}
      >
        Sign in
      </span>
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
