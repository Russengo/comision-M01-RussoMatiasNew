import { Schema, model, Types } from "mongoose";
import * as bcrypt from "bcrypt";

const UserSchema = new Schema({
  avatar: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

// Hash

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export const UserModel = model("User", UserSchema);
