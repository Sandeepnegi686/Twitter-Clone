"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

// import useUserModel from "../_hooks/useUser";
import useLoginModel from "../_hooks/useLoginModel";
import { getCurrentUser } from "../_hooks/getCurrentUser";

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  alert?: boolean;
}

export default function SidebarItem({
  href,
  label,
  icon: Icon,
  onClick,
  alert,
}: SidebarItemProps) {
  const router = useRouter();
  // const { user } = useUserModel();
  const { user } = getCurrentUser();
  const { isOpen, onOpen } = useLoginModel();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();
    if (!user && href !== "/") {
      onOpen();
      return;
    }
    if (href) router.push(href);
  }, [onClick, href, router, isOpen, user]);

  return (
    <div className="flex items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex justify-center p-4 hover:bg-slate-900 hover:text-gray-400 cursor-pointer lg:hidden transition">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-3 left-1" size={60} />
        ) : null}
      </div>
      <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-full hover:bg-slate-900 hover:text-gray-400 cursor-pointer transition">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
}
