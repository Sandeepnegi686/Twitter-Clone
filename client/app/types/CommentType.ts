import { PostType } from "./PostType";
import { UserType } from "./UserType";

export interface CommentType {
  _id: string;
  body: string;
  userId: string | UserType;
  PostId: string | PostType;

  createdAt?: string;
  updatedAt?: string;
}
