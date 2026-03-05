import { api } from "@/app/_lib/api";
import { PostType } from "@/app/types/PostType";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}
interface GET_POST_API_RESPONSE {
  success: boolean;
  posts: PostType[];
}

export default async function PostFeed({ userId }: PostFeedProps) {
  const { data } = await api.get<GET_POST_API_RESPONSE>(
    userId ? `/api/v1/post/getPosts/${userId}` : "/api/v1/post/getPosts/",
  );
  const posts = data.posts;
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} userId={userId} />
      ))}
    </>
  );
}
