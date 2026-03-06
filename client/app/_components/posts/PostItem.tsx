"use client";
import useLoginModel from "@/app/_hooks/useLoginModel";
import useUserModel from "@/app/_hooks/useUser";
import { PostType } from "@/app/types/PostType";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import API_BASE_URL from "@/app/_lib/api";
import toast from "react-hot-toast";
import { sendNotification } from "@/app/_lib/sendNotification";

interface PostItemProps {
  post: PostType;
  userId?: string;
}

export default function PostItem({ post }: PostItemProps) {
  const router = useRouter();
  const loginModel = useLoginModel();
  const { user } = useUserModel();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${post.userId._id}`);
    },
    [router, post._id],
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${post._id}`);
  }, [router, post._id]);

  const onLike = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!user) {
        loginModel.onOpen();
        return;
      }
      if (hasLiked) {
        const res = await fetch(`${API_BASE_URL}/api/v1/post/un-like-post`, {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({ postId: post._id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!data.success) {
          toast.error(data.error);
          return;
        }
        toast.success("unLiked");
        post.likedId = post.likedId?.filter((ids) => ids !== user._id);
      } else {
        const res = await fetch(`${API_BASE_URL}/api/v1/post/like-post`, {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ postId: post._id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!data.success) {
          toast.error(data.error);
          return;
        }
        toast.success("Liked");
        post.likedId = post.likedId?.filter((ids) => ids !== user._id);
        await sendNotification(
          `${user.name} liked your tweet`,
          post.userId._id,
        );
      }
    },
    [loginModel.isOpen, post._id, user?._id, post.likedId],
  );

  const createdAt = useMemo(
    function () {
      if (!post?.createdAt) {
        return null;
      }
      return formatDistanceToNowStrict(new Date(post?.createdAt));
    },
    [post?.createdAt],
  );
  const hasLiked = useMemo(
    function () {
      if (!user) return false;
      if (post.likedId?.includes(user?._id)) return true;
      return false;
    },
    [user?._id, post.likedId?.length, loginModel.isOpen, onLike],
  );

  return (
    <div
      className="border-b border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
      onClick={goToPost}
    >
      <div className="flex items-start gap-3">
        <Avatar
          userId={post.userId._id}
          profileImage={post?.userId?.profileImage}
        />
        <div>
          <div className="flex items-center gap-2">
            <p
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {post.userId.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{post.userId.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{post.body}</div>
          <div className="flex items-center mt-3 gap-10">
            <div className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{post.comments?.length || 0}</p>
            </div>
            <div
              className="flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
              onClick={onLike}
            >
              {hasLiked ? (
                <AiFillHeart size={20} color="red" />
              ) : (
                <AiOutlineHeart size={20} />
              )}
              <p>{post.likedId?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
