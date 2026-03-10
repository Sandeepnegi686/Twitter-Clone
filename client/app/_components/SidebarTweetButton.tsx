"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import useLoginModel from "../_hooks/useLoginModel";
import { getCurrentUser } from "../_hooks/getCurrentUser";

export default function SidebarTweetButton() {
  const router = useRouter();
  const loginModel = useLoginModel();
  const { user } = getCurrentUser();

  const onClick = useCallback(
    function () {
      if (!user) loginModel.onOpen();
    },
    [loginModel, user],
  );

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-6 py-2 bg-sky-500 rounded-full hover:opacity-90 transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
}
