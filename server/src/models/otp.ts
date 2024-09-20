import mongoose, { Document, Schema } from "mongoose";

interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  name: string;
  password: string;
}

const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  name: { type: String, required: false },
  password: { type: String, required: false },
});

export const OTP = mongoose.model<IOTP>("OTP", otpSchema);
