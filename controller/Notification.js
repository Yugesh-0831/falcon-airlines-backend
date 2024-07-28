const { User } = require("../model/User");
const { fetchUserById } = require("./user");

exports.sendNotifications = async (flight, message) => {
  const userIds = flight.users;
  for (const userId of userIds) {
    const user = await User.findById(userId).exec();
    sendNotification(user, flight.flight_id, message);
  }
};

const sendNotification = (user, flight_id, message) => {
  console.log(user);
  const timestamp = new Date().toISOString();
  if (user.phone) {
    const smsNotification = {
      flight_id: flight_id,
      message: message,
      timestamp: timestamp,
      method: "SMS",
      recipient: user.phone,
    };
    console.log(smsNotification);
  }
  if (user.email) {
    const emailNotification = {
      flight_id: flight_id,
      message: message,
      timestamp: timestamp,
      method: "Email",
      recipient: user.email,
    };
    console.log(emailNotification);
  }
};

const handleNotifications = () => {};
