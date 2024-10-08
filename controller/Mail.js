require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.APP_PASS,
  },
});

async function sendMail(mailId, message) {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Falcon Airlines",
        address: process.env.SENDER_MAIL,
      },
      to: mailId,
      subject: "Your flight update",
      text: message,
    });

    console.log("Mail sent successfully");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = sendMail;
