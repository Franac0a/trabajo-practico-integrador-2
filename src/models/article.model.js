import { Schema, Types, model } from "mongoose";
import { commentModel } from "./comment.model.js";
const ArticleSchema = new Schema(
  {
    title: { type: String, minlength: 3, maxlength: 200, required: true },
    content: { type: String, minlength: 50, required: true },
    excerpt: { type: String, maxlength: 500 },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
    },
    author: { type: Types.ObjectId, ref: "User" },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true, versionKey: false }
);

//eliminacion en cascada
ArticleSchema.pre("findByIdAndDelete", async (doc) => {
  if (!doc) return;

  const CommentModel = model("Comment");

  await CommentModel.deleteMany({ article: doc._id });
});

//populate inverso
ArticleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author",
});
ArticleSchema.set("toJSON", { virtuals: true });
export const articleModel = model("Article", ArticleSchema);
