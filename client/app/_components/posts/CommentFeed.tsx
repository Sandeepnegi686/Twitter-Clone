import { CommentType } from "@/app/types/CommentType";
import CommentItem from "./CommentItem";
import { getComments } from "@/app/_hooks/getCommentsByPostId";

interface CommentFeedType {
  postId?: string;
}

export default function CommentFeed({ postId }: CommentFeedType) {
  const { comments } = getComments(postId!);
  return (
    <>
      {comments?.map((comment: CommentType) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </>
  );
}
