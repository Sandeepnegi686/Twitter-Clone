import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    body: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    likedId: { type: Schema.Types.ObjectId },
    comments: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // username: { type: String, required: true, unique: true },
    // bio: { type: String },
    // email: { type: String, unique: true },
    // emailVarified: { type: Date },
    // image: { type: String },
    // coverImage: { type: String },
    // profileImage: { type: String },
    // hashedPassword: { type: String },
    // followingIds: { type: Schema.Types.ObjectId, ref: "User" },
    // hasNotifications: { type: Boolean },

    // posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    // notifications: [{ type: Schema.Types.ObjectId, ref: "Notifications" }],
  },
  { timestamps: true },
);

export default model("Post", schema);
