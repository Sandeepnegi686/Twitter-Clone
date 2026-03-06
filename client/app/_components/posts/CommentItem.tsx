"use client";
import { CommentType } from "@/app/types/CommentType";
import { UserType } from "@/app/types/UserType";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItemType {
  comment: CommentType;
}

export default function CommentItem({ comment }: CommentItemType) {
  const router = useRouter();

  const goToUser = useCallback(
    function (event: any) {
      event.stopPropagation();
      router.push(`/users/${(comment.userId as UserType)._id}`);
    },
    [router, (comment.userId as UserType)._id],
  );

  const createdAt = useMemo(() => {
    if (!comment?.createdAt) return null;
    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment.createdAt]);

  const user = comment.userId as UserType;
  return (
    <div className="border-b border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex items-start gap-3">
        <Avatar userId={user._id} profileImage={user.profileImage} />
        <div>
          <div className="flex items-center gap-2">
            <p
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {user.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{comment.body}</div>
        </div>
      </div>
    </div>
  );
}
