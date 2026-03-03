import { api } from "@/app/_lib/api";

interface PostFeedProps {
  userId?: string;
}

// async

export default async function PostFeed({ userId }: PostFeedProps) {
  const posts = await api.get("/api/v1/post/getPost");
  return <div></div>;
}
