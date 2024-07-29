const { User } = require("../model/User");
const sendMail = require("./Mail");
const sendSMS = require("./SMS");

exports.sendNotifications = async (flight, message) => {
  const userIds = flight.users;
  for (const userId of userIds) {
    const user = await User.findById(userId).exec();
    sendNotification(user, flight.flight_id, message);
  }
};

const sendNotification = (user, flight_id, message) => {
  const timestamp = new Date().toISOString();
  if (user.phone) {
    const smsNotification = {
      flight_id: flight_id,
      message: message,
      timestamp: timestamp,
      method: "SMS",
      recipient: user.phone,
    };
    handleNotifications(smsNotification);
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
    handleNotifications(emailNotification);
    console.log(emailNotification);
    sendMail();
  }
};

const handleNotifications = (notification) => {
  if (notification.method === "Email") {
    sendMail(notification.recipient, notification.message);
  } else {
    sendSMS(notification.recipient, notification.message);
  }
};
