import {
  searchUsers,
  getFriendList,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  deleteFriend,
  checkIfUserExists,
} from "../services/userConnectionService";

export const searchUserController = async (req: any, res: any) => {
  try {
    const { id } = req.body?.user;

    if (!id) {
      return res.status(400).json({ message: "Please provide user" });
    }

    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const response = await searchUsers(id, email);
    if (!response?.success) {
      return res.status(400).json({ message: response?.message });
    }
    return res.status(200).json({ users: response.users });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriendListController = async (req: any, res: any) => {
  try {
    const { id } = req.body?.user;

    if (!id) {
      return res.status(400).json({ message: "Please provide user" });
    }

    const response = await getFriendList(id);
    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }
    return res.status(200).json({ friendsList: response.friendsList });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendFriendRequestController = async (req: any, res: any) => {
  try {
    const { id } = req.body?.user;
    const { receiverId } = req.body;

    console.log(id, receiverId);

    if (!id || !receiverId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const response = await sendFriendRequest(id, receiverId);
    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }
    return res.status(200).json({ message: response.message });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequestController = async (req: any, res: any) => {
  try {
    const { id } = req.body?.user;
    const { senderId } = req.body;

    console.log("accept", id, senderId);

    if (!id || !senderId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const response = await acceptFriendRequest(id, senderId);
    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }
    return res.status(200).json({ message: response.message });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const declineFriendRequestController = async (req: any, res: any) => {
  try {
    const { id } = req.body?.user;
    const { senderId } = req.body;

    if (!id || !senderId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const response = await declineFriendRequest(id, senderId);
    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }
    return res.status(200).json({ message: response.message });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteFriendController = async (req: any, res: any) => {
  try {
    const { id } = req.body?.user;
    const { friendId } = req.body;

    if (!id || !friendId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const response = await deleteFriend(id, friendId);
    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }
    return res.status(200).json({ message: response.message });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
