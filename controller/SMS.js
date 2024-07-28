require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendSMS = async (number, message) => {
  let msgOptions = {
    from: process.env.SENDER_PHONE,
    to: "+91" + number,
    body: message,
  };
  try {
    const res = await client.messages.create(msgOptions);
    console.log("SMS sent successfully");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = sendSMS;
