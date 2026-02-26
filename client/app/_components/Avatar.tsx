import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  profileImage?: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export default function Avatar({
  userId,
  hasBorder,
  isLarge,
  profileImage,
}: AvatarProps) {
  const router = useRouter();

  const onClick = useCallback(function (event: any) {
    event.stopPropagation();
    const url = `/users/${userId}`;
    router.push(url);
  }, []);

  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""} ${isLarge ? "h-32" : "h-12"} ${isLarge ? "w-32" : "w-12"} rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        objectFit="cover"
        style={{ borderRadius: "100%" }}
        alt="Avatar"
        onClick={onClick}
        src={profileImage || "/images/placeholder.jpg"}
      />
    </div>
  );
}
