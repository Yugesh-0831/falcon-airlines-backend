const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, required: true, default: "user" },
  flights: { type: [Schema.Types.ObjectId], ref: "Flight" },
});

exports.User = mongoose.model("User", userSchema);
