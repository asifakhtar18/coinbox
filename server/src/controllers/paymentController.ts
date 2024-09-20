import { Request, Response } from "express";

import { Payment } from "../models/payment";
import { Schema } from "mongoose";
import { Group } from "../models/group";
import { paymentType } from "../utils/contanst";

export const getPaymentDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.body?.user;
    const { groupId } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.some((member) => member.user.toString() === id)) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    const payments = group?.members.map((member) => {
      return Payment.find({ group: groupId });
    });
    return res.status(200).json({ payments });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to get payments", error: error });
  }
};

export const addPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.body?.user;

    const { groupId, memberId, status, day, month, year, amount, paymentType } =
      req.body;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.some((member) => member.user.toString() === id)) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    const member = group.members.find(
      (memberId) => memberId.user.toString() === id
    );

    if (member?.role == "viewer") {
      return res
        .status(403)
        .json({ message: "Only admins and managers can add payments" });
    }
    const payment = await Payment.create({
      group: groupId,
      user: memberId,
      status: status,
      amount: amount,
      day: day,
      month: month,
      year: year,
      paymentType: paymentType || "cash",
      updatedBy: id,
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res
      .status(200)
      .json({ message: "Payment status updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to update payment status", error: error });
  }
};
