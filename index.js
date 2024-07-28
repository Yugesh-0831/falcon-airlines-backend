const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flightRouter = require("./routes/Flight");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cors = require("cors");
// const WebSocket = require("ws");
// const server = require("http").createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     console.log(`Received message => ${message}`);
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

// function broadcast(data) {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(data));
//     }
//   });
// }

app.use(cors());
app.use(express.json()); //to parse req.body
app.use("/flights", flightRouter.router);
app.use("/users", userRouter.router);
app.use("/auth", authRouter.router);

main();

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/indigo-airlines");
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
}

app.listen(8080, () => {
  console.log("server started successfully");
});
