const { Worker } = require("bullmq");
require("dotenv").config();
const transporter = require("../config/mailer");

const fromEmail = process.env.USER_EMAIL;

const worker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, name } = job.data;

    try {
      await transporter.sendMail({
        from: `Splitwise <${fromEmail}>`,
        to: email,
        subject: "Welcome to Splitwise 🎉",

        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
          <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; text-align: center; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h1 style="color: #4CAF50;">Welcome to Splitwise 🎉</h1>
            <p style="font-size: 16px; color: #333;">Hello <b>${name}</b>,</p>
            <p style="font-size: 15px; color: #555;">Your account has been created successfully.</p>
            <p style="font-size: 15px; color: #555;">Start splitting expenses easily</p>
            <a href="YOUR_APP_URL" style="display: inline-block; background: #0F52BA; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; margin-top: 20px;">Welcome 🤗</a>
          </div>
        </div>
      `,
      });
      console.log(`Email sent successfully to ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
      throw error;
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  },
);

worker.on("error", (err) => {
  console.error("Worker connection error:", err);
});

console.log("Email Worker Running");
