import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { SALT } from "../utils/contanst";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  friends: Schema.Types.ObjectId[];
  friendRequestsReceived: Schema.Types.ObjectId[];
  friendRequestsSent: Schema.Types.ObjectId[];
  groups: Schema.Types.ObjectId[];
  groupInvites: Schema.Types.ObjectId[];
  notifications: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequestsReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequestsSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    groupInvites: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ name: 1 });
userSchema.index({ friends: 1 });
userSchema.index({ groups: 1 });

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT);
  }
  next();
});

export const User = mongoose.model<User>("User", userSchema);
