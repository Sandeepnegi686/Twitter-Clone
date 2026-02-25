export interface UserType {
  _id: string;
  name: string;
  username: string;
  email: string;
  emailVarified?: boolean;
  bio?: string;
  image?: string;
  coverImage?: string;
  profileImage?: string;
  followingIds?: string[];
  hasNotifications?: boolean;

  posts?: string[];
  comments?: string[];
  notifications?: string[];
}
