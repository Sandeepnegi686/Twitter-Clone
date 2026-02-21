import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    body: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export default model("Notification", schema);
