import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  bio: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const User = mongoose.model("User", userSchema);
