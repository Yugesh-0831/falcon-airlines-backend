const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
  flight_id: { type: String, required: true },
  airline: { type: String, required: true },
  price: { type: Number, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, required: true },
  departure_gate: { type: String, required: true },
  arrival_gate: { type: String, required: true },
  scheduled_departure: { type: Date },
  scheduled_arrival: { type: Date },
  actual_departure: { type: Date },
  actual_arrival: { type: Date },
  users: { type: [Schema.Types.ObjectId], ref: "User" },
  updates: [
    {
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

exports.Flight = mongoose.model("Flight", flightSchema);
