const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "curro.rb@gmail.com",
    pass: "Parejade4",
  },
});

const sendMail = async (to, subject, html) => {
  try {
    const options = {
      from: "curro.rb@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;