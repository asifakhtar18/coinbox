export const PORT = process.env.PORT || 3000;
export const SALT = Number(process.env.SALT) || 10;
export const emailSubject = "Email verification code";
export const emailText = "Email verification code";
export const OTP_VALIDITY = 5 * 60 * 1000;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export enum paymentFrequency {
  "daily",
  "weekly",
  "bi-weekly",
  "monthly",
  "quarterly",
  "annually",
  "one-time",
}

export enum paymentType {
  "cash",
  "card",
  "upi",
  "bank-transfer",
}
