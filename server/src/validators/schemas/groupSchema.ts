import { z } from "zod";

export const groupSchema = z.object({
  name: z.string().min(1, "Group name must be at least 1 character long"),
  description: z
    .string()
    .min(3, "Group description must be at least 3 characters long"),
  amount: z.number().min(0, "Amount must be at least 0"),
  payementFrequency: z.enum([
    "daily",
    "weekly",
    "bi-weekly",
    "monthly",
    "quarterly",
    "annually",
    "one-time",
  ]),
  duration: z.number().min(1, "Duration must be at least 1"),
  dayOfPay: z.number().min(1).max(31, "Day of pay must be between 1 and 31"),
  monthOfPay: z
    .array(z.string())
    .min(1, "At least one month of pay is required"),
  startDate: z.string().date(),
  endDay: z.number().min(1).max(31).optional(),
  endMonth: z.number().min(1).max(12).optional(),
  endYear: z.number().optional(),
  endDate: z.date().optional(),
  paymentMethod: z.enum(["cash", "cheque", "transfer"]),
  profilePicture: z.string().optional(),
  members: z.array(
    z.object({
      user: z.string(),
      role: z.enum(["admin", "manager", "viewer"]),
      payment: z.string().default("pending"),
    })
  ),
});
