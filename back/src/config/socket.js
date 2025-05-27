import http from "http";
import { Server } from "socket.io";
import express from "express";
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const connectedUsers = {};

export function getUserSocket(userId) {
  return connectedUsers[userId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  connectedUsers[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(connectedUsers));
  socket.on("disconnect", () => {
    console.log("disconnected");
    var id=socket.id
    const onlineUSersId=Object.keys(connectedUsers)
    for (let i = 0; i < onlineUSersId.length; i++) {
        if(connectedUsers[onlineUSersId[i]]==id) delete connectedUsers[onlineUSersId[i]]
    }
  io.emit("onlineUsers", Object.keys(connectedUsers));
  });
});
