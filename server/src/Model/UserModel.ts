import { Model, model, Schema } from "mongoose";
import { APIError } from "../middleware/errorHandler";
import argon2 from "argon2";
import { Types } from "mongoose";

interface UserType {
  name: string;
  username: string;
  email: string;
  hashedPassword: string;
  emailVarified?: boolean;
  bio?: string;
  image?: string;
  coverImage?: string;
  coverImagePublicId?: string;
  profileImage?: string;
  profileImagePublicId?: string;
  followingIds?: Types.ObjectId[];
  hasNotifications?: boolean;

  posts?: Types.ObjectId[];
  comments?: Types.ObjectId[];
  notifications?: Types.ObjectId[];
}
interface IUserMethods {
  comparePassword(userPassword: string): Promise<boolean>;
}
type UserModelType = Model<UserType, {}, IUserMethods>;

const schema = new Schema<UserType, UserModelType, IUserMethods>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true, select: false },
    emailVarified: { type: Date },
    bio: { type: String },
    image: { type: String },
    coverImage: { type: String },
    coverImagePublicId: { type: String },
    profileImage: { type: String },
    profileImagePublicId: { type: String },
    followingIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    hasNotifications: { type: Boolean },

    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notifications" }],
  },
  { timestamps: true },
);

schema.pre("save", async function () {
  if (this.isModified("hashedPassword")) {
    try {
      this.hashedPassword = await argon2.hash(this.hashedPassword!);
    } catch (error) {
      console.log(error);
      throw new APIError("Document password cannot be saved", 400);
    }
  }
});

schema.methods.comparePassword = async function (userPassword: string) {
  try {
    return await argon2.verify(this.hashedPassword, userPassword);
  } catch (error) {
    console.log(error);
    throw new APIError("Creadentials invalid!", 400);
  }
};

export default model<UserType, UserModelType>("User", schema);
