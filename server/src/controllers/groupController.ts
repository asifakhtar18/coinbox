import { Request, Response } from "express";
import { Group } from "../models/group";
import { validateData } from "../validators/SchemaValidator";
import { groupSchema } from "../validators/schemas/groupSchema";
import { Schema } from "mongoose";
import { console } from "inspector";
import { ZodError, z } from "zod";
import mongoose from "mongoose";
import { Payment } from "../models/payment";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Member {
  user: User;
  role: string;
  _id: string;
}

interface Payment {
  _id: string;
  group: string;
  amount: number;
  status: string;
  paymentType: string;
  day: number;
  month: string;
  year: number;
  updatedBy: string;
  paymentDate: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

interface GroupData {
  group: {
    _id: string;
    name: string;
    description: string;
    members: Member[];
    amount: number;
    paymentFrequency: string;
    duration: number;
    dayOfPay: number;
    monthOfPay: string[];
    startDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  paymentDetails: Payment[];
}

interface MemberPaymentDetails {
  user: User;
  role: string;
  paymentsByYear: { [year: number]: Payment[] };
}

function mergePaymentDetails(data: GroupData): MemberPaymentDetails[] {
  const { group, paymentDetails } = data;
  const groupMembers = group.members;
  const memberPayments: { [memberId: string]: MemberPaymentDetails } = {};

  // Initialize member payment details
  groupMembers.forEach((member) => {
    memberPayments[member.user._id] = {
      user: member.user,
      role: member.role,
      paymentsByYear: {},
    };
  });

  // Populate member payment details
  paymentDetails.forEach((payment) => {
    const memberId = payment.updatedBy;
    const year = payment.year;

    if (!memberPayments[memberId].paymentsByYear[year]) {
      memberPayments[memberId].paymentsByYear[year] = [];
    }

    memberPayments[memberId].paymentsByYear[year].push(payment);
  });

  return Object.values(memberPayments).map((member) => ({
    ...member,
    paymentsByYear: Object.entries(member.paymentsByYear).reduce(
      (acc, [year, payments]) => ({
        ...acc,
        [Number(year)]: payments,
      }),
      {}
    ),
  }));
}

export const getGroupDetails = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.query;
    const group = await Group.findById(groupId)
      .populate({
        path: "members.user",
        select: "_id name email profilePicture",
      })
      .lean();

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const paymentDetails = await Payment.find({ group: groupId });

    // mergePaymentDetails({ group, paymentDetails });

    return res.status(200).json({ group, paymentDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get group details" });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const data = validateData(req.body, groupSchema);

    if (data instanceof Array) {
      return res
        .status(400)
        .json({ message: "Validation errors", errors: data });
    }

    const { id } = req.body?.user;
    const {
      name,
      description,
      amount,
      paymentFrequency,
      duration,
      dayOfPay,
      monthOfPay,
      startDate,
      paymentMethod,
      profilePicture,
      members,
    } = req.body;

    members: members.map(
      (member: { user: number; role: any; paymentStatus: any }) => ({
        user: new mongoose.Types.ObjectId(member.user), // Convert string to ObjectId
        role: member.role,
      })
    );

    members.push({ user: id, role: "admin" });

    const group = await Group.create({
      name,
      description,
      members: members,
      amount,
      paymentFrequency,
      duration,
      dayOfPay,
      monthOfPay,
      startDate,
      paymentMethod,
      profilePicture,
    });

    return res.status(201).json({ group });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to create group", error: error });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { id } = req.body?.user;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (
      !group.members.some(
        (member) => member.user.toString() === id && member.role === "admin"
      )
    ) {
      return res.status(403).json({ message: "Only admins can delete groups" });
    }

    await group.deleteOne();
    return res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete group" });
  }
};

export const addMemberToGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.body?.user;
    const { memberId, groupId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (
      !group.members.some(
        (member) => member.user.toString() === id && member.role === "admin"
      )
    ) {
      return res
        .status(403)
        .json({ message: "Only admins can add members to groups" });
    }

    if (group.members.some((member) => member.user.toString() === memberId)) {
      return res.status(400).json({ message: "Member already in the group" });
    }

    group.members.push({ user: memberId, role: "viewer" });
    await group.save();

    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add member to group" });
  }
};

export const removeMemberFromGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.body?.user;
    const { memberId, groupId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isAdmin = group.members.some(
      (member) => member.user.toString() === id && member.role === "admin"
    );
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can remove members from groups" });
    }

    group.members = group.members.filter(
      (member) => member.user.toString() !== memberId
    );
    await group.save();

    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to remove member from group" });
  }
};

export const updateMemberRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.body?.user;
    const { groupId, memberId, role } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isAdmin = group.members.some(
      (member) => member.user.toString() === id && member.role === "admin"
    );
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can update member roles" });
    }

    const member = group.members.find(
      (member) => member.user.toString() === memberId
    );
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    member.role = role; // Update role
    await group.save();

    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update member role" });
  }
};

export const leaveGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.body?.user;
    const { groupId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const member = group.members.find(
      (member) => member.user.toString() === id
    );
    if (!member) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    // Remove user from members
    group.members = group.members.filter((m) => m.user.toString() !== id);
    await group.save();

    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to leave group" });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.body?.user;
    const { groupId, name, description, profilePicture } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (
      !group.members.some(
        (member) => member.user.toString() === id && member.role === "admin"
      )
    ) {
      return res.status(403).json({ message: "Only admins can update groups" });
    }

    if (name) group.name = name;
    if (description) group.description = description;
    if (profilePicture) group.profilePicture = profilePicture;

    await group.save();
    return res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update group" });
  }
};
