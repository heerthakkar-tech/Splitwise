const jwt = require("jsonwebtoken");
const Joi = require("joi");
const redisClient = require("../config/redis");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader && authHeader.split(" ")[1];

  //store token for logout
  req.token = token;

  // check redis blacklist
  const isBlacklisted = await redisClient.get(`blacklist:${token}`);

  if (isBlacklisted) {
    return res.status(401).json({
      message: "Token has been logged out",
    });
  }

  if (!token) return res.status(401).json({ message: "Token missing" });

  // verify jwt
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
