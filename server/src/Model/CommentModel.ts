import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true },
);

export default model("Comment", schema);
