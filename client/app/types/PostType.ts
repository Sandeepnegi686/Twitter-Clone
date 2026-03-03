export interface PostType {
  _id: string;
  body: string;
  userId: string;
  likedId?: string[];
  comments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
