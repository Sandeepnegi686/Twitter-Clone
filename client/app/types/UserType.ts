export interface UserType {
  _id: string;
  name: string;
  username: string;
  email: string;
  emailVarified?: boolean;
  bio?: string;
  image?: string;
  coverImage?: string;
  coverImagePublicId?: string;
  profileImage?: string;
  profileImagePublicId?: string;
  followingIds?: string[];
  followersCount?: number;
  hasNotifications?: boolean;
  createdAt?: string;
  updatedAt?: string;

  posts?: string[];
  comments?: string[];
  notifications?: string[];
}
