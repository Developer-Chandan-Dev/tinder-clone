import User from "../models/user.model.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const swipeRight = async (req, res) => {
  try {
    const { likedUserId } = req.params;

    const currentUser = await User.findById(req.user.id);
    const likedUser = await User.findById(likedUserId);

    if (!likedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!currentUser.likes.includes(likedUserId)) {
      currentUser.likes.push(likedUserId);
      await currentUser.save();

      //  if the other user already liked us, it's a match, so let's update both users
      if (likedUser.likes.includes(currentUser.id)) {
        currentUser.matches.push(likedUserId);
        likedUser.matches.push(currentUser.id);

        await Promise.all([await currentUser.save(), await likedUser.save()]);

        // send notification in real-time with socket.io
        const connectedUsers = getConnectedUsers();
        const io = getIO();

        const likedUserSocketId = connectedUsers.get(likedUserId);
        if (likedUserSocketId) {
          io.to(likedUserSocketId).emit("newMatch", {
            _id: currentUser._id,
            name: currentUser.name,
            image: currentUser.image,
          });
        }

        const currentSocketId = connectedUsers.get(currentUser._id.toString());
        if (currentSocketId) {
          io.to(currentSocketId).emit("newMatch", {
            _id: likedUser._id,
            name: likedUser.name,
            image: likedUser.image,
          });
        }

        // const likedUserSocketId
      }
    }

    res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.log("Error in swipeleft:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const swipeLeft = async (req, res) => {
  try {
    const { dislikeUserId } = req.params;

    const currentUser = await User.findById(req.user.id);

    if (!currentUser.dislikes.includes(dislikeUserId)) {
      currentUser.dislikes.push(dislikeUserId);
      await currentUser.save();
    }

    res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.log("Error in swipeleft:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMatches = async (req, res) => {
  try {

    // First approach
    const user = await User.findById(req.user.id).populate(
      "matches",
      "name image"
    );

    // SEcond approach
    // const user = await User.findById(req.user.id).populate({
    //   path: "matches",
    //   select: "name image", // Specify fields to retrieve from matched users
    // }).exec();

    res.status(200).json({ success: true, matches: user.matches });
  } catch (error) {
    console.log("Error in getMatches", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const users = await User.find({
      $and: [
        { _id: { $ne: currentUser.id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.dislikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },
        {
          genderPreference: { $in: [currentUser.gender, "both"] },
        },
      ],
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error in getUserProfiles:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
