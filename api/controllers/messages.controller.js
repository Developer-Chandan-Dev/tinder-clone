import Message from "../models/messages.model.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });

    // SEND THE MESSAGE IN REAL TIME => SOCKET.IO
    const connectedUsers = getConnectedUsers();
    const io = getIO();

    const receiverSocketID = connectedUsers.get(receiverId);

    if (receiverSocketID) {
      io.to(receiverSocketID).emit("newMessage", {
        message: newMessage,
      });
    }

    res.status(200).json({ success: true, newMessage });
  } catch (error) {
    console.log("Error in sendMessage:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort("createdAt");

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("Error in getConversation:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
