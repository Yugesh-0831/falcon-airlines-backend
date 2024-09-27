const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flightRouter = require("./routes/Flight");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./utils/socket-io");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, "build")));
app.use(cors());
app.use(express.json()); // to parse req.body

initializeSocket(server);

app.use("/flights", flightRouter.router);
app.use("/users", userRouter.router);
app.use("/auth", authRouter.router);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}

main();

server.listen(process.env.PORT || 8080, () => {
  console.log("Server started successfully");
});
