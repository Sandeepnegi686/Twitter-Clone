import mongoose from "mongoose";

let cached = (global as any).mongoose as any;

export async function connectDB(db_url: string) {
  if (cached) return cached;

  cached = await mongoose.connect(db_url);
  return cached;
}