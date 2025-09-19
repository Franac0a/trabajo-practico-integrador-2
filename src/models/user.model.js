import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstName: { type: String, minlength: 2, maxlength: 50, required: true },
      lastName: { type: String, minlength: 2, maxlength: 50, required: true },
      biography: { type: String, maxlength: 500 },
      avatarUrl: {
        type: String,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      },
      birthDate: { type: Date },
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updated" } }
);

export const UserModel = model("User", UserSchema);
