"use client";
import Image from "next/image";
import Avatar from "./Avatar";

interface UserHeroProps {
  userId: string;
  profileImage?: string;
  coverImage?: string;
}

export default function UserHero({
  userId,
  profileImage,
  coverImage,
}: UserHeroProps) {
  return (
    <div className="bg-neutral-700 h-44 relative">
      <Image
        src={coverImage ? coverImage : "/images/default-cover-image.jpg"}
        fill
        alt="Cover"
        objectFit="cover"
      />
      <div className="absolute -bottom-16 left-4">
        <Avatar userId={userId} isLarge hasBorder profileImage={profileImage} />
      </div>
    </div>
  );
}
