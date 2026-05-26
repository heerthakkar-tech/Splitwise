const db = require("../config/db");

// Find user by email this is for checking that user exist or not
const findByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  return db.query(sql, [email], callback);
};

// Create a new user
const createUser = (userData, callback) => {
  const { name, email, hashedPassword } = userData;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  return db.query(sql, [name, email, hashedPassword], callback);
};

module.exports = { findByEmail, createUser };
