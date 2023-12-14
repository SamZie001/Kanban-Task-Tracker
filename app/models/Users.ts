import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    required: true,
    type: String,
    minLength: [8, "Password should be at least 8 characters"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

export const User = models.users || model("users", userSchema);
