import io from "socket.io-client";
import { useUserStore } from "../store/useUserStore";

const SOCKET_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

let socket = null;

export const initializeSocket = (userId) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: { userId },
  });

  // socket.on() is used to listen to the events. can be used both on client and server side
  // Listen to "getOnlineUsers" event
  socket.on("getOnlineUsers", (users) => {
    console.log(SOCKET_URL, userId);
    console.log(users);

    // Update Zustand state with the received users
    useUserStore.getState().setOnlineUsers(users);
  });
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getOnlineUsers = () => {};
