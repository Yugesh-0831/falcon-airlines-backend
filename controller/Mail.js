const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "yugeshjhamb0831@gmail.com",
    pass: "ovpz dhlf yfwl hjbv",
  },
});

async function sendMail(mailId, message) {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Indigo Airlines",
        address: "yugeshjhamb0831@gmail.com",
      },
      to: mailId,
      subject: "Your flight update",
      text: message,
    });

    console.log("Mail sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendMail;
