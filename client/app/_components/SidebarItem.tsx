"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

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
  const handleClick = useCallback(function () {
    if (onClick) return onClick();
    if (href) router.push(href);
  }, []);
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
