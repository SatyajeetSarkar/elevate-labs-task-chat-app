const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, reason);
  });

  socket.on("message", (data) => {
    console.log(data)    
  })
});

module.exports = { io, app, server };
