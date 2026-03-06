import { CommentType } from "./CommentType";
import { UserType } from "./UserType";

export interface PostType {
  _id: string;
  body: string;
  userId: UserType;
  likedId?: string[];
  comments?: string[] | CommentType[];
  createdAt: Date;
  updatedAt: Date;
}
