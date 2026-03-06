import { CommentType } from "@/app/types/CommentType";
import CommentItem from "./CommentItem";

interface CommentFeedType {
  comments?: CommentType[];
}

export default function CommentFeed({ comments }: CommentFeedType) {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </>
  );
}
