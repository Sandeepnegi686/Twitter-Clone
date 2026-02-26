import React from "react";
import useUserModel from "../_hooks/useUser";
import Image from "next/image";
import Avatar from "./Avatar";

interface UserHeroProps {
  userId: string;
}

export default function UserHero({ userId }: UserHeroProps) {
  const { user } = useUserModel();
  return (
    <div className="bg-neutral-700 h-44 relative">
      {user?.coverImage && <Image src={user?.coverImage} fill alt="Cover" />}
      <div className="absolute -bottom-16 left-4">
        <Avatar userId={userId} isLarge hasBorder />
      </div>
    </div>
  );
}
