"use client";
import Form from "@/app/_components/Form";
import Header from "@/app/_components/Header";
import CommentFeed from "@/app/_components/posts/CommentFeed";
import PostItem from "@/app/_components/posts/PostItem";
import { getPost } from "@/app/_hooks/getPost";
import { useParams } from "next/navigation";

export default function Page() {
  const { postId } = useParams<{ postId: string }>();
  const { post, isLoading } = getPost(postId);

  if (isLoading) {
    return;
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem post={post} />
      <Form post={post} isComment placeholder="Tweet your reply" />
      <CommentFeed postId={post._id} />
    </>
  );
}
