import { group } from "console";
import { Schema, Document, model } from "mongoose";

interface Payment extends Document {
  group: Schema.Types.ObjectId;
  member: Schema.Types.ObjectId;
  amount: number;
  status: string;
  paymentType: string;
  paymentDate: Date;
}

const paymentSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    member: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "due"] },
    paymentType: {
      type: String,
      enum: ["cash", "card", "upi", "bank-transfer"],
    },
    day: { type: Number, min: 1, max: 31, required: true },
    month: {
      type: String,
      enum: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
    },
    year: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

paymentSchema.index({ group: 1 });

paymentSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
  next();
});

export const Payment = model<Payment>("Payment", paymentSchema);
