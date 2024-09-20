import { Schema } from "mongoose";
import { User } from "../models/user";

type ObjectId = Schema.Types.ObjectId;

export const checkIfUserExists = async (userId: ObjectId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Error checking user existence:", error);
    return {
      success: false,
      message: "Error checking user",
    };
  }
};

export const searchUsers = async (userId: ObjectId, query: string) => {
  try {
    if (!userId) {
      return { success: false, message: "User not found" };
    }

    const userResult = await checkIfUserExists(userId);

    const regex = new RegExp(query, "i");
    const users = await User.find({
      $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
    });

    if (!users) {
      return { success: false, message: "No user found" };
    }

    const filteredUsers = users.filter(
      (user) => user._id?.toString() !== userId?.toString()
    );

    return { success: true, users: filteredUsers };
  } catch (error) {
    console.error("Error searching users:", error);
  }
};

export const getFriendList = async (userId: ObjectId) => {
  const { success, user, message } = await checkIfUserExists(userId);
  if (!success) return { success, message };

  const friends = user?.friends || [];
  const friendsList = await Promise.all(
    friends.map((friendId) =>
      User.findById(friendId, " _id name email profilePicture")
    )
  );

  return { success: true, friendsList };
};

export const sendFriendRequest = async (
  userId: ObjectId,
  receiverId: ObjectId
) => {
  try {
    const senderResult = await checkIfUserExists(userId);
    const receiverResult = await checkIfUserExists(receiverId);

    if (!senderResult.success || !receiverResult.success)
      return { success: false, message: "Sender or receiver not found" };

    const sender = senderResult.user;
    const receiver = receiverResult.user;

    if (sender?.friendRequestsSent.includes(receiverId)) {
      return {
        success: false,
        message: "Friend request already sent",
      };
    }

    await Promise.all([
      User.updateOne(
        { _id: receiverId },
        { $push: { friendRequestsReceived: userId } }
      ),
      User.updateOne(
        { _id: userId },
        { $push: { friendRequestsSent: receiverId } }
      ),
    ]);

    return { success: true, message: "Friend request sent" };
  } catch (error) {
    console.error("Error sending friend request:", error);
    return { success: false, message: "Error sending friend request" };
  }
};

export const acceptFriendRequest = async (
  userId: ObjectId,
  senderId: ObjectId
) => {
  try {
    const userResult = await checkIfUserExists(userId);
    const senderResult = await checkIfUserExists(senderId);

    if (!userResult.success || !senderResult.success)
      return { success: false, message: "User or sender not found" };

    if (!userResult.user?.friendRequestsReceived.includes(senderId)) {
      return {
        success: false,
        message: "Friend request not found",
      };
    }

    await Promise.all([
      User.updateOne(
        { _id: userId },
        {
          $push: { friends: senderId },
          $pull: { friendRequestsReceived: senderId },
        }
      ),
      User.updateOne(
        { _id: senderId },
        {
          $push: { friends: userId },
          $pull: { friendRequestsSent: userId },
        }
      ),
    ]);

    return { success: true, message: "Friend request accepted" };
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return { success: false, message: "Error accepting friend request" };
  }
};

export const declineFriendRequest = async (
  userId: ObjectId,
  senderId: ObjectId
) => {
  try {
    const userResult = await checkIfUserExists(userId);
    const senderResult = await checkIfUserExists(senderId);

    if (!userResult.success || !senderResult.success)
      return { success: false, message: "User or sender not found" };

    if (!userResult.user?.friendRequestsReceived.includes(senderId)) {
      return {
        success: false,
        message: "Friend request not found",
      };
    }

    await Promise.all([
      User.updateOne(
        { _id: senderId },
        { $pull: { friendRequestsSent: userId } }
      ),
      User.updateOne(
        { _id: userId },
        { $pull: { friendRequestsReceived: senderId } }
      ),
    ]);

    return { success: true, message: "Friend request declined" };
  } catch (error) {
    console.error("Error declining friend request:", error);
    return { success: false, message: "Error declining friend request" };
  }
};

export const deleteFriend = async (userId: ObjectId, friendId: ObjectId) => {
  try {
    const userResult = await checkIfUserExists(userId);
    const friendResult = await checkIfUserExists(friendId);

    if (!userResult.success || !friendResult.success)
      return { success: false, message: "User or friend not found" };

    if (!userResult.user?.friends.includes(friendId)) {
      return {
        success: false,
        message: "Friend not found",
      };
    }

    await Promise.all([
      User.updateOne({ _id: userId }, { $pull: { friends: friendId } }),
      User.updateOne({ _id: friendId }, { $pull: { friends: userId } }),
    ]);

    return { success: true, message: "Friend removed" };
  } catch (error) {
    console.error("Error deleting friend:", error);
    return { success: false, message: "Error removing friend" };
  }
};
