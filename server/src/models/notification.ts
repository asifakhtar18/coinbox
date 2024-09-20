import { Schema, Document, model } from "mongoose";

interface Notification extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  type: string;
  message: string;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String },
    message: { type: String },
    seen: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

notificationSchema.index({ sender: 1 });
notificationSchema.index({ receiver: 1 });

notificationSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
  next();
});

export const Notification = model<Notification>(
  "Notification",
  notificationSchema
);
