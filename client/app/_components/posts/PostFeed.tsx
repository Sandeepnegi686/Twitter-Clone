"use client";
import { PostType } from "@/app/types/PostType";
import PostItem from "./PostItem";
import { getAllPosts } from "@/app/_hooks/getPosts";

interface PostFeedProps {
  userId?: string;
}

export default function PostFeed({ userId }: PostFeedProps) {
  const { posts } = getAllPosts(userId);
  return (
    <>
      {posts.map((post: PostType) => (
        <PostItem key={post._id} post={post} />
      ))}
    </>
  );
}
