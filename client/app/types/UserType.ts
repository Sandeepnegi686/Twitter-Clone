export interface UserType {
  name: string;
  username: string;
  email: string;
  hashedPassword: string;
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
