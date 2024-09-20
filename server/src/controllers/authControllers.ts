import { promises as fs } from "fs";

import { Request, Response } from "express";
import { User } from "../models/user";
import { validateData } from "../validators/SchemaValidator";
import { userSchema } from "../validators/schemas/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { OTP } from "../models/otp";
import { generateOTP } from "../services/otpService";
import sendEmail from "../services/emailService";
import { emailSubject, JWT_SECRET, OTP_VALIDITY } from "../utils/contanst";
import { group, groupEnd } from "console";
import { console } from "inspector";
import { Schema } from "mongoose";
import { Group } from "../models/group";

const generateToken = (id: ObjectId) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
};

const checkIfUserExists = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
};

const checkIfOtpExists = async (email: string) => {
  const otpEntry = await OTP.findOne({ email });
  if (otpEntry && otpEntry.expiresAt > new Date()) {
    return otpEntry;
  }
  await OTP.deleteMany({ expiresAt: { $lt: new Date() } });
  return null;
};

const sendOtp = async (email: string, otp: string) => {
  try {
    let template = await fs.readFile("src/views/otp-template.html", "utf8");
    template = template.replace(/{{otp}}/g, otp);
    // console.log(template);
    await sendEmail(email, emailSubject, template);
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const otpEntry = await OTP.findOne({ otp, email });

    if (!otpEntry || otpEntry.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const { name, password } = otpEntry;

    const isExistingUser = await checkIfUserExists(email);
    if (isExistingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const user = await User.create({
      name,
      password: password,
      email,
    });

    await OTP.deleteMany({ email });

    const token = generateToken(user._id as ObjectId);

    res.status(200).json({
      message: "Email verified successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: JSON.stringify(error) });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userData = {
      name,
      email,
      password,
    };

    const validationResult = validateData(userData, userSchema);

    if (!validationResult) {
      return res
        .status(400)
        .json({ message: "Invalid data", errors: validationResult });
    }

    if (await checkIfUserExists(email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const existingOtp = await checkIfOtpExists(email);
    const otp = existingOtp ? existingOtp.otp : generateOTP();

    if (!existingOtp) {
      await OTP.create({
        name,
        password,
        email,
        otp,
        expiresAt: new Date(Date.now() + OTP_VALIDITY),
      });
    }

    await sendOtp(email, otp);

    res.status(200).json({ message: "OTP sent successfully", email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const existingOtp = await checkIfOtpExists(email);
    if (!existingOtp) {
      return res.status(400).json({ message: "Please try after sometime" });
    }

    await sendOtp(email, existingOtp.otp);
    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await checkIfUserExists(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingOtp = await checkIfOtpExists(email);

    const otp = existingOtp ? existingOtp.otp : generateOTP();
    if (!existingOtp) {
      const otpEntry = await OTP.create({
        email,
        otp,
        name: user.name,
        expiresAt: new Date(Date.now() + OTP_VALIDITY),
      });
    }

    await sendOtp(email, otp);

    res.status(200).json({ message: "Password reset OTP sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Password reset failed" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, password } = req.body;
    console.log(email, otp, password);
    const otpEntry = await OTP.findOne({ otp, email });

    if (!otpEntry || otpEntry.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPw = await bcrypt.hash(password, 10);

    const updatedUser = await User.updateOne({ email }, { password: hashedPw });
    console.log(updatedUser);
    await OTP.deleteMany({ email });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Password reset failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await checkIfUserExists(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id as ObjectId);

    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const getUserDetails = async (req: any, res: any) => {
  try {
    const { id } = req.body?.user;
    const user = await User.findById(id)
      .select("-password -__v")
      .populate([
        {
          path: "friends",
          select: "_id name email profilePicture",
        },
        {
          path: "friendRequestsSent",
          select: "_id name email profilePicture",
        },
        {
          path: "friendRequestsReceived",
          select: "_id name email profilePicture",
        },
        {
          path: "groups",
          select: "_id name profilePicture description",
        },
        {
          path: "groupInvites",
          select: "_id name profilePicture description",
        },
      ])
      .lean()
      .orFail();

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};
