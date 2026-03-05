import { UserType } from "./UserType";

export interface PostType {
  _id: string;
  body: string;
  userId: UserType;
  likedId?: string[];
  comments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
