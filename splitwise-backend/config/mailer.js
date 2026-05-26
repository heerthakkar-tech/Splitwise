const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // or use host: 'smtp.gmail.com', port: 465, secure: true
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD, // See Gmail note below
  },
});

module.exports = transporter;
