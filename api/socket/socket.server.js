import { Server } from "socket.io";

let io;

const connectedUsers = new Map();
// {userId : socketId}

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) return next(new Error("Invalid userId"));

    socket.userId = userId;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`User connected with socket id: ${socket.id}`);
    connectedUsers.set(socket.userId, socket.id);

    // console.log(Object.fromEntries(connectedUsers), '28');
    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Array.from(connectedUsers.keys()));

    socket.on("disconnect", () => {
      console.log(`User disconnected with socket id: ${socket.id}`);
      connectedUsers.delete(socket.userId);
      io.emit("getOnlineUsers", Array.from(connectedUsers.keys()));
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io initialized");
  }
  return io;
};

export const getConnectedUsers = () => {
  return connectedUsers;
};

