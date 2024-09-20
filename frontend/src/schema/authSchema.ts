import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .min(6, 'Otp must be at least 6 characters long')
    .max(6, 'Otp must be at most 6 characters long'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  otp: z
    .string()
    .min(6, 'Otp must be at least 6 characters long')
    .max(6, 'Otp must be at most 6 characters long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
