"use client";
import { useMemo } from "react";
import useUserModel from "../_hooks/useUser";
import { UserType } from "../types/UserType";
import { format } from "date-fns";
import Button from "./Button";
import { BiCalendar } from "react-icons/bi";
import useEditModel from "../_hooks/useEditModel";

interface UserBioProps {
  userId: string;
  fetchedUser: UserType | null;
  followersCount: number;
}

export default function UserBio({
  userId,
  fetchedUser,
  followersCount,
}: UserBioProps) {
  const { user } = useUserModel();
  const { onOpen } = useEditModel();

  // console.log(fetchedUser);
  const createdAt = useMemo(
    function () {
      if (!fetchedUser?.createdAt) {
        return null;
      }
      return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
    },
    [fetchedUser?.createdAt],
  );
  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {user?._id === userId ? (
          <Button secondary label="Edit" onClick={() => onOpen()} />
        ) : (
          <Button onClick={() => {}} label="Follow" secondary />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p> Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex items-center mt-4 gap-6">
          <div className="flex items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
        </div>
        <div className="flex items-center mt-4 gap-6">
          <div className="flex items-center gap-1">
            <p className="text-white">{followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
