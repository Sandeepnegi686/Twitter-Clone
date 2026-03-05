import { api } from "@/app/_lib/api";
import { PostType } from "@/app/types/PostType";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}
interface GETPOSTAPIRESPONSE {
  success: boolean;
  posts: PostType[];
}

export default async function PostFeed({ userId }: PostFeedProps) {
  const { data } = await api.get<GETPOSTAPIRESPONSE>(
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
