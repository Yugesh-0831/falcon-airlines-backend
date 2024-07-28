const socketIO = require("socket.io");
let io;

exports.initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

exports.broadcastMessage = (key, message) => {
  if (io) {
    io.emit(key, message);
  }
};
