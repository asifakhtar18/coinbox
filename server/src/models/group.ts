import { Document, Schema, model } from "mongoose";
interface Member {
  user: Schema.Types.ObjectId;
  role: "admin" | "manager" | "viewer";
}

interface Group extends Document {
  name: string;
  description: string;
  members: Member[];
  profilePicture: string;
  amount: number;
  paymentFrequency: string;
  duration: number;
  dayOfPay: number;
  monthOfPay: string[];
  paymentMethod: string;
  paymentStatus: string[];
  startDate: Date;
  endDay: number;
  endMonth: number;
  endYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const groupSchema = new Schema<Group>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: {
          type: String,
          enum: ["admin", "manager", "viewer"],
          required: true,
        },
      },
    ],
    amount: { type: Number, required: true, min: 0 },
    paymentFrequency: {
      type: String,
      enum: ["monthly", "bi-weekly", "weekly"],
      default: "monthly",
      required: true,
    },
    duration: { type: Number, default: 1, min: 1, required: true },
    dayOfPay: { type: Number, min: 1, max: 31, required: true },
    monthOfPay: {
      type: [String],
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
        "ALL",
      ],
      required: true,
    },
    startDate: { type: Date, default: Date.now, required: true },
    endDay: { type: Number, min: 1, max: 31 },
    endMonth: { type: Number, min: 1, max: 12 },
    endYear: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

groupSchema.index({ name: 1 });
groupSchema.index({ members: 1 });

groupSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
  next();
});

export const Group = model<Group>("Group", groupSchema);
