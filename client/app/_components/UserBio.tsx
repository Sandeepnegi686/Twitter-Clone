"use client";
import { useCallback, useMemo } from "react";
import useUserModel from "../_hooks/useUser";
import { UserType } from "../types/UserType";
import { format } from "date-fns";
import Button from "./Button";
import { BiCalendar } from "react-icons/bi";
import useEditModel from "../_hooks/useEditModel";
import useLoginModel from "../_hooks/useLoginModel";
import API_BASE_URL, { api } from "../_lib/api";
import toast from "react-hot-toast";
import { sendNotification } from "../_lib/sendNotification";

interface UserBioProps {
  userId: string;
  fetchedUser: UserType | null;
  followersCount: number;
}
type FollowUnfollowResponse = {
  success: boolean;
  message: string;
  user: UserType;
};

export default function UserBio({
  userId,
  fetchedUser,
  followersCount,
}: UserBioProps) {
  const { user, setUser } = useUserModel();
  const { onOpen } = useEditModel();
  const loginModel = useLoginModel();

  const createdAt = useMemo(
    function () {
      if (!fetchedUser?.createdAt) {
        return null;
      }
      return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
    },
    [fetchedUser?.createdAt],
  );

  const isFollowing = useMemo(
    function () {
      if (user) {
        const isFollowing = user.followingIds?.some((id) => id === userId);
        return isFollowing;
      }
    },
    [user?.followingIds, userId],
  );

  const handleFollow = useCallback(async () => {
    if (!user) {
      loginModel.onOpen();
      return;
    }
    if (isFollowing) {
      const res = await fetch(`${API_BASE_URL}/api/v1/user/follow-user`, {
        body: JSON.stringify({ userId }),
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success("Unfollowed");
      setUser(data.user!);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      const res = await fetch(`${API_BASE_URL}/api/v1/user/follow-user`, {
        body: JSON.stringify({ userId }),
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success("Followed");
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      await sendNotification(`${user.name} followed you`, userId);
    }
  }, [user, isFollowing, userId, loginModel]);

  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {user?._id === userId ? (
          <Button secondary label="Edit" onClick={() => onOpen()} />
        ) : (
          <Button
            onClick={handleFollow}
            label={isFollowing ? "UnFollow" : "Follow"}
            secondary
          />
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
