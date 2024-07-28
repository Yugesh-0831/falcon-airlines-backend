const express = require("express");
const {
  createFlightSchedule,
  fetchAllFlights,
  updateFlight,
} = require("../controller/Flight");

const router = express.Router();
router
  .post("/", createFlightSchedule)
  .get("/", fetchAllFlights)
  .patch("/:id", updateFlight);

exports.router = router;
