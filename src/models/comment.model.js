import { Schema, Types, model } from "mongoose";

const commetSchema = new Schema(
  {
    content: { type: String, required: true, minlength: 5, maxlength: 500 },
    author: { type: Types.ObjectId, ref: "User" },
    article: { type: Types.ObjectId, ref: "Article" },
  },
  { timestamps: true, versionKey: false }
);

export const commentModel = model("Comment", commetSchema);
