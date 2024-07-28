const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flightRouter = require("./routes/Flight");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./utils/socket-io");

const server = http.createServer(app);

app.use(cors());
app.use(express.json()); // to parse req.body

initializeSocket(server);

app.use("/flights", flightRouter.router);
app.use("/users", userRouter.router);
app.use("/auth", authRouter.router);

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/indigo-airlines");
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}

main();

server.listen(8080, () => {
  console.log("Server started successfully");
});
