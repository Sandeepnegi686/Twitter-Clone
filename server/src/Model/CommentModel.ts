import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    body: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true },
);

export default model("Comment", schema);
