import Form from "@/app/_components/Form";
import Header from "@/app/_components/Header";
import CommentFeed from "@/app/_components/posts/CommentFeed";
import PostItem from "@/app/_components/posts/PostItem";
import API_BASE_URL from "@/app/_lib/api";
import { CommentType } from "@/app/types/CommentType";
import { PostType } from "@/app/types/PostType";
import toast from "react-hot-toast";

async function fetchPost(postId: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/post/getPostById/${postId}`);
  if (!res.ok) throw new Error(`HTTP error, status code: ${res.status}`);
  const data = await res.json();
  if (!data.success) {
    toast.error(data.message);
    return null;
  }
  return data.post;
}

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const post = (await fetchPost(postId)) as PostType;
  // console.log(post);

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem post={post} />
      <Form postId={post._id} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={post.comments as CommentType[]} />
    </>
  );
}
