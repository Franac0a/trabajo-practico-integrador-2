import { Schema, model } from "mongoose";

const userSchema = new Schema(
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
      match: /.+\@.+\..+/,
    },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profile: {
      firstName: { type: String, minlength: 2, maxlength: 50, required: true },
      lastName: { type: String, minlength: 2, maxlength: 50, required: true },
      biography: { type: String, maxlength: 500 },
      avatarUrl: { type: String },
      birthDate: { type: Date, default: Date.now },
      deletedAt: { type: Date, default: null },
    },
  },
  { timestamps: true, versionKey: false }
);

//eliminacion en cascada
userSchema.pre("findByIdAndUpdate", async (doc) => {
  if (!doc) return;

  if (doc.deletedAt !== null) {
    const ArticleModel = model("Article");
    const CommentModel = model("Comment");

    await ArticleModel.deleteMany({ author: doc._id });
    await CommentModel.deleteMany({ author: doc._id });
  }
});

//para populates inversos
userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});
userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author",
});

userSchema.set("toJSON", { virtuals: true });

export const userModel = model("User", userSchema);
