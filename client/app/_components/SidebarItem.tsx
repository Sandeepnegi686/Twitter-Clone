"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import useUserModel from "../_hooks/useUser";
import useLoginModel from "../_hooks/useLoginModel";

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
}

export default function SidebarItem({
  href,
  label,
  icon: Icon,
  onClick,
}: SidebarItemProps) {
  const router = useRouter();
  const { user } = useUserModel();
  const { isOpen, onOpen } = useLoginModel();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();
    if (!user && href !== "/") {
      onOpen();
      return;
    }
    if (href) router.push(href);
  }, [onClick, href, router, isOpen]);

  return (
    <div className="flex items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex justify-center p-4 hover:bg-slate-900 hover:text-gray-400 cursor-pointer lg:hidden transition">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-full hover:bg-slate-900 hover:text-gray-400 cursor-pointer transition">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
}
