import mongoose from "mongoose";
const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 2,
      maxlength: 30,
      match: /^\S+$/, // sin espacios?
    },
    description: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updated" } }
);

export const TagModel = mongoose.model("Tag", TagSchema);
