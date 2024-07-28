const { Flight } = require("../model/Flight");
const { sendNotifications } = require("./Notification");

exports.fetchAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.createFlightSchedule = async (req, res) => {
  const flightSchedule = new Flight(req.body);
  try {
    const response = await flightSchedule.save();
    res.status(201).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.updateFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await sendNotifications(updatedFlight, req.body.message);
    res.status(200).json(updatedFlight);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
