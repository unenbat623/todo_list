import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theme: { type: String, default: "noir" },
  createdAt: { type: Date, default: Date.now },
});

const TodoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Robust model initialization for Next.js
export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export const Todo = mongoose.models?.Todo || mongoose.model("Todo", TodoSchema);
