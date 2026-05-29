require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../Model/authModel");
const transporter = require("../config/mailer");
const redisClient = require("../config/redis");

const fromEmail = process.env.USER_EMAIL;

// //signup route
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    userModel.findByEmail([email], async (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      userModel.createUser(
        { name, email, hashedPassword },
        async (err, result) => {
          if (err) return res.status(500).json({ message: err.message });

          const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
          );

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

          res.status(201).json({ message: "Signup successful", token });
        },
      );
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};

// login route
const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req?.body);

  userModel.findByEmail(email, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json(err);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // genetating token after logib
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        },
      );

      res.status(200).json({ message: "Login successful", token });
    });
  });
};

// Logout route
const logout = async (req, res) => {
  try {
    const token = req.token;

    await redisClient.set(`blacklist:${token}`, "true", {
      EX: 86400, // 24 hours same as jwt
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { signup, login, logout };
